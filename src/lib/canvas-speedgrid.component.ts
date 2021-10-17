import { Component, Injector } from '@angular/core';
import { CanvasBaseDirective, ICanvas } from 'angular-canvas-base';

@Component({
    selector: 'canvas-speedgrid',
    template: ''
})
export class CanvasSpeedgridComponent extends CanvasBaseDirective {
    constructor(injector: Injector) {
        super(injector);

        this.resize(500, 500);
    }

    protected onDraw(canvas: ICanvas, frameTime: number): void {
        canvas.drawRect(10, 10, 180, 180, true, true);
    }
}
