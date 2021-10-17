import { Component, Injector } from '@angular/core';
import { ICanvas, Point } from 'projects/angular-canvas-base/src/public-api';
import { CanvasBaseComponent } from '../../../angular-canvas-base/src/lib/canvas-base-component';

@Component({
    selector: 'canvas-speedgrid',
    template: ''
})
export class CanvasSpeedgridComponent extends CanvasBaseComponent {
    constructor(injector: Injector) {
        super(injector);

        this.resize(1000, 200);
    }

    protected onDraw(canvas: ICanvas) {
        canvas.drawRect(10, 10, 180, 180, false, true);
    }

    protected onFrameUpdate(deltaTime: number) {
        // No continous drawing, we can ignore this
    }

    protected eventResize(width: number, height: number) {
        // nothing for now
    }

    protected eventClick(event: PointerEvent) {
        // nothing for now
    }

    protected eventDrag(event: PointerEvent): boolean {
        // nothing for now
        return false;
    }

    protected eventDragMove(event: PointerEvent) {
        // nothing for now
    }

    protected eventDrop(event: PointerEvent, startPosition: Point) {
        // nothing for now
    }
}
