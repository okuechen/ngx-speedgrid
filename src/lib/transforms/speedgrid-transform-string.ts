import { PipeTransform } from '@angular/core';

import { FillStyle, ICanvas } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';
import { ISpeedgridTransform } from '../interfaces/speedgrid-transform';

export class SpeedgridTransformString implements ISpeedgridTransform<string> {
    protected pipeArgs: any[] | undefined;

    constructor(protected pipe?: PipeTransform, ...pipeArgs: any[]) {
        this.pipeArgs = pipeArgs.length > 0 ? pipeArgs : undefined;
    }

    public transformValue(value: string): string {
        if (this.pipe) {
            return this.pipe.transform(value, this.pipeArgs);
        } else {
            return value;
        }
    }

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridBodyCell, value: string): void {
        const transformedvalue = this.transformValue(value);

        if (transformedvalue != null) {
            canvas.setFillStyle(new FillStyle('#000'));
            canvas.drawText(transformedvalue, cell.x + 4, cell.y + 21, undefined, true, false);
        }
    }

}
