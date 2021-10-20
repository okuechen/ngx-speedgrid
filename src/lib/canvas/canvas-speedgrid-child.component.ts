import { Component, Injector, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

import { CanvasBaseDirective, CanvasDrawMode, FillStyle, ICanvas } from 'angular-canvas-base';

import { SpeedgridColumn } from '../interfaces/speedgrid-column';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';
import { SpeedgridTheme } from '../themes/speedgrid-theme';
import { getDefaultSpeedgridOptions, SpeedgridOptions } from '../interfaces/speedgrid-options';
import { SpeedgridLocation } from '../interfaces/speedgrid-location';
import { SpeedgridLayout } from '../classes/speedgrid-layout';
import { SpeedgridThemeDark } from '../themes/speedgrid-theme-dark';

@Component({
    selector: 'canvas-speedgrid-child',
    template: ''
})
export class CanvasSpeedgridChildComponent<Entity = any> extends CanvasBaseDirective implements OnChanges {

    @Input() public columns: SpeedgridColumn<Entity>[] = [];

    @Input() public options: SpeedgridOptions = getDefaultSpeedgridOptions();

    @Input() public theme: ISpeedgridTheme = new SpeedgridTheme();

    @Input() public data?: Entity[] = [];

    @Output() public clicked: EventEmitter<SpeedgridLocation> = new EventEmitter<SpeedgridLocation>();

    @Input() public scrollOffsetX = 0;
    @Input() public scrollOffsetY = 0;

    private layout = new SpeedgridLayout();

    constructor(injector: Injector) {
        super(injector);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.recalcLayout();
        this.draw();
    }

    protected onDraw(canvas: ICanvas, frameTime: number): void {
        this.theme.startDrawing(canvas, this.columns, this.options);

        // Draw body cells first, so header and footer overdraw instead of more expensive clipping
        this.theme.startDrawingBody(canvas);
        this.layout.prepareVisibleBodyCells(this.scrollOffsetX, this.scrollOffsetY, cell => {
            this.theme.drawBodyCell(canvas, cell);

            const obj = this.data?.[cell.tablePositionY];

            if (obj) {
                canvas.setFillStyle(new FillStyle('#000'));
                canvas.drawText(_.get(obj, this.columns[cell.tablePositionX].property), cell.x + 4, cell.y + 21, undefined, true, false);
            }
        });

        this.theme.startDrawingHeader(canvas);
        this.layout.prepareVisibleHeaderCells(this.scrollOffsetX, this.scrollOffsetY, cell => {
            this.theme.drawHeaderCell(canvas, cell);

            if (this.theme instanceof SpeedgridThemeDark) {
                canvas.setFillStyle(new FillStyle('#FFF'));
            } else {
                canvas.setFillStyle(new FillStyle('#000'));
            }

            canvas.drawText(this.columns[cell.tablePositionX].label, cell.x + 4, cell.y + 21, cell.width, true, false);
        });

        this.theme.startDrawingFooter(canvas);
        this.layout.prepareVisibleFooterCells(this.scrollOffsetX, this.scrollOffsetY, cell => {
            this.theme.drawFooterCell(canvas, cell);
        });

        this.theme.finishDrawing(canvas);
    }

    protected eventResize(width: number, height: number): void {
        this.recalcLayout();
    }

    /**
     * Prevent object creation during drawing cause this would slowdown.
     */
    protected recalcLayout(): void {
        this.layout.recalcLayout(this.columns, this.options, this.height);
    }
}
