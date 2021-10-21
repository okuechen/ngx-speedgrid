import { PipeTransform } from '@angular/core';

import { FillStyle, ICanvas } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';
import { ISpeedgridTransform } from '../interfaces/speedgrid-transform';

export class SpeedgridTransformNumber implements ISpeedgridTransform<number> {
    protected pipeArgs: any[] | undefined;

    constructor(protected pipe?: PipeTransform, ...pipeArgs: any[]) {
        this.pipeArgs = pipeArgs.length > 0 ? pipeArgs : undefined;
    }

    public transformValue(value: number): string {
        if (this.pipe) {
            return this.pipe.transform(value, this.pipeArgs);
        } else {
            return value.toString();
        }
    }

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridBodyCell, value: number): void {
        const transformedvalue = this.transformValue(value);

        if (transformedvalue != null) {
            canvas.setFillStyle(new FillStyle('#000'));
            const textMetrics = canvas.measureText(transformedvalue);
            canvas.drawText(transformedvalue, cell.x + cell.width - 4 - textMetrics.width, cell.y + 21, undefined, true, false);
        }
    }

}
