import { Component, Injector, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { CanvasBaseDirective, FillStyle, ICanvas } from '../../../../angular-canvas-base/src/public-api'; // TODO: to package

import { SpeedgridColumn } from '../interfaces/speedgrid-column';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';
import { SpeedgridTheme } from '../themes/speedgrid-theme';
import { getDefaultSpeedgridOptions, SpeedgridOptions } from '../interfaces/speedgrid-options';
import { SpeedgridLocation } from '../interfaces/speedgrid-location';
import { SpeedgridLayout } from '../classes/speedgrid-layout';
import { SpeedgridThemeDark } from '../themes/speedgrid-theme-dark';
import { SpeedgridBodyCellRendererString } from '../cell-renderer/body/speedgrid-body-cell-renderer-string';
import { SpeedgridImageStorageService } from '../services/speedgrid-image-storage.service';
import { Subscription } from 'rxjs';
import { SpeedgridHeaderCellRendererDefault } from '../cell-renderer/header/speedgrid-header-cell-renderer-default';
import { SpeedgridFooterCellRendererDefault } from '../cell-renderer/footer/speedgrid-footer-cell-renderer-default';
import { SpeedgridOrderByPair } from '../interfaces/speedgrid-orderby-pair';

@Component({
    selector: 'canvas-speedgrid-child',
    template: ''
})
export class CanvasSpeedgridChildComponent<Entity = any> extends CanvasBaseDirective implements OnInit, OnChanges, OnDestroy {

    @Input() public columns: SpeedgridColumn<Entity>[] = [];

    @Input() public options: SpeedgridOptions = getDefaultSpeedgridOptions();

    @Input() public theme: ISpeedgridTheme = new SpeedgridTheme();

    @Input() public data?: Entity[] = [];

    @Output() public clicked: EventEmitter<Readonly<SpeedgridLocation>> = new EventEmitter();
    @Output() public hoveredCellsChanged: EventEmitter<Readonly<SpeedgridLocation[]>> = new EventEmitter();
    @Output() public selectedCellsChanged: EventEmitter<Readonly<SpeedgridLocation[]>> = new EventEmitter();
    @Output() public orderByChanged: EventEmitter<Readonly<SpeedgridOrderByPair[]>> = new EventEmitter();

    @Input() public scrollOffsetX = 0;
    @Input() public scrollOffsetY = 0;

    private layout = new SpeedgridLayout();
    private imageSubscription: Subscription;

    private defaultBodyCellRenderer = new SpeedgridBodyCellRendererString();
    private defaultHeaderCellRenderer = new SpeedgridHeaderCellRendererDefault();
    private defaultFooterCellRenderer = new SpeedgridFooterCellRendererDefault();

    constructor(injector: Injector, private imageStorageService: SpeedgridImageStorageService) {
        super(injector);

        // Redraw on every image that is loaded for now
        this.imageSubscription = this.imageStorageService.imageUpdated.subscribe((path) => this.draw());

        this.layout.selectedCellsChanged.subscribe(cells => this.selectedCellsChanged.emit(cells));
        this.layout.hoveredCellsChanged.subscribe(cells => this.hoveredCellsChanged.emit(cells));
        this.layout.orderByChanged.subscribe(pairs => this.orderByChanged.emit(pairs));
        this.layout.cursorChanged.subscribe(cursor => this.renderer.setStyle(this.eventElement, 'cursor', cursor));
    }

    public ngOnInit(): void {
        this.enableDragAndDrop(true);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        let rebuild = false;
        let removeSelected = false;

        if (changes.columns != null ||
            changes.options != null ||
            changes.theme != null) {
            rebuild = true;
        }

        if (changes.data) {
            removeSelected = true;
        }

        this.recalcLayout(rebuild, removeSelected);
        this.draw();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        if (this.imageSubscription) {
            this.imageSubscription.unsubscribe();
        }
    }

    protected onDraw(canvas: ICanvas, frameTime: number): void {
        this.theme.startDrawing(canvas, this.columns, this.options);

        // Draw body cells first, so header and footer overdraw instead of more expensive clipping
        this.theme.startDrawingBody(canvas);
        this.layout.prepareVisibleBodyCells(this.scrollOffsetX, this.scrollOffsetY, cell => {
            this.theme.drawBodyCell(canvas, cell);

            const obj = this.data?.[cell.tablePositionY];
            const value = _.get(obj, this.columns[cell.tablePositionX].property);

            if (this.columns[cell.tablePositionX].bodyCellRenderer) {
                this.columns[cell.tablePositionX].bodyCellRenderer?.draw(canvas, this.theme, cell, value);
            } else {
                this.defaultBodyCellRenderer.draw(canvas, this.theme, cell, value);
            }
        });

        this.theme.startDrawingHeader(canvas);
        this.layout.prepareVisibleHeaderCells(this.scrollOffsetX, this.scrollOffsetY, cell => {
            this.theme.drawHeaderCell(canvas, cell);

            if (this.columns[cell.tablePositionX].headerCellRenderer) {
                this.columns[cell.tablePositionX].headerCellRenderer?.draw(canvas, this.theme,
                    cell, this.columns[cell.tablePositionX].label);
            } else {
                this.defaultHeaderCellRenderer.draw(canvas, this.theme, cell, this.columns[cell.tablePositionX].label);
            }
        });

        this.theme.startDrawingFooter(canvas);
        this.layout.prepareVisibleFooterCells(this.scrollOffsetX, this.scrollOffsetY, cell => {
            this.theme.drawFooterCell(canvas, cell);

            if (this.columns[cell.tablePositionX].footerCellRenderer) {
                this.columns[cell.tablePositionX].footerCellRenderer?.draw(canvas, this.theme, cell);
            } else {
                this.defaultFooterCellRenderer.draw(canvas, this.theme, cell);
            }
        });

        this.theme.finishDrawing(canvas);
    }

    protected eventResize(width: number, height: number): void {
        this.recalcLayout(false, false);
    }

    protected eventPointerMove(event: PointerEvent): void {
        const location = this.layout.getLocationByPointerEvent(event, this.scrollOffsetX, this.scrollOffsetY);

        if (this.layout.handlePointer(event, this.columns, this.options, location)) {
            this.draw();
        }
    }

    protected eventPointerLeave(event: PointerEvent): void {
        if (this.layout.handlePointer(event, this.columns, this.options)) {
            this.draw();
        }
    }

    protected eventClick(event: PointerEvent): void {
        const location = this.layout.getLocationByPointerEvent(event, this.scrollOffsetX, this.scrollOffsetY);

        if (this.layout.handlePointer(event, this.columns, this.options, location)) {
            this.draw();
        }

        this.clicked.next(location);
    }

    /**
     * Prevent object creation during drawing cause this would slowdown.
     */
    protected recalcLayout(rebuild: boolean, removeSelected: boolean): void {
        this.layout.recalcLayout(this.columns, this.options, this.height, rebuild, removeSelected);
    }
}
