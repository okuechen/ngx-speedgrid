import { Component, Injector } from '@angular/core';
import { CanvasBaseDirective, ICanvas } from 'projects/angular-canvas-base/src/public-api';

@Component({
    selector: 'canvas-speedgrid',
    template: ''
})
export class CanvasSpeedgridComponent extends CanvasBaseDirective {
    constructor(injector: Injector) {
        super(injector);

        this.resize(500, 500);
    }

    protected onDraw(canvas: ICanvas, frameTime: number) {
        canvas.drawRect(10, 10, 180, 180, true, true);
    }
}
