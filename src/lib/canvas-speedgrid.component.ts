import { Component, Injector, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { CanvasBaseDirective, ICanvas } from 'angular-canvas-base';

import { SpeedgridColumn } from './interfaces/speedgrid-column';
import { ISpeedgridTheme } from './interfaces/speedgrid-theme';
import { SpeedgridTheme } from './themes/speedgrid-theme';
import { getDefaultSpeedgridOptions, SpeedgridOptions } from './interfaces/speedgrid-options';
import { SpeedgridLocation } from './interfaces/speedgrid-location';
import { SpeedgridLayout } from './classes/speedgrid-layout';

@Component({
    selector: 'canvas-speedgrid',
    template: ''
})
export class CanvasSpeedgridComponent<Entity> extends CanvasBaseDirective implements OnChanges {

    @Input() public columns: SpeedgridColumn[] = [];

    @Input() public options: SpeedgridOptions = getDefaultSpeedgridOptions();

    @Input() public theme: ISpeedgridTheme = new SpeedgridTheme();

    @Input() public data?: Entity[] = [];

    @Output() public clicked: EventEmitter<SpeedgridLocation> = new EventEmitter<SpeedgridLocation>();

    private scrollOffsetX = 0;
    private scrollOffsetY = 0;

    private layout = new SpeedgridLayout();

    constructor(injector: Injector) {
        super(injector);

        this.resize(1000, 500);

        window.setInterval(() => {
            this.scrollOffsetY += 1;
            this.draw();
        }, 1000 / 60);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.recalcLayout();
        this.draw();
    }

    protected onDraw(canvas: ICanvas, frameTime: number): void {
        // We just could get a new array with cells and handle it, but that would create new arrays. We avoid object creation.
        // Also we draw body cells first, so header and footer overdraw instead of more expensive clipping
        this.layout.prepareVisibleBodyCells(this.scrollOffsetX, this.scrollOffsetY, cell => this.theme.drawBodyCell(canvas, cell));
        this.layout.prepareVisibleHeaderCells(this.scrollOffsetX, this.scrollOffsetY, cell => this.theme.drawHeaderCell(canvas, cell));
        this.layout.prepareVisibleFooterCells(this.scrollOffsetX, this.scrollOffsetY, cell => this.theme.drawFooterCell(canvas, cell));
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
