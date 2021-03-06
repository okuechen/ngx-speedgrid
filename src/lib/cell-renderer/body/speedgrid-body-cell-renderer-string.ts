import { PipeTransform } from '@angular/core';

import { ICanvas } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../../interfaces/speedgrid-body-cell';
import { ISpeedgridTheme } from '../../interfaces/speedgrid-theme';
import { ISpeedgridCellRenderer } from '../../interfaces/speedgrid-cell-renderer';

/**
 * Most common and default cell renderer, using a pipe to transform the string before rendering.
 * If no pipe is given, it will render the value as string, no matter what it is.
 */
export class SpeedgridBodyCellRendererString implements ISpeedgridCellRenderer<SpeedgridBodyCell, string> {
    protected pipeArgs: any[] | undefined;

    constructor(protected pipe?: PipeTransform, ...pipeArgs: any[]) {
        this.pipeArgs = pipeArgs.length > 0 ? pipeArgs : undefined;
    }

    public transformValue(value?: string): string | null {
        if (this.pipe) {
            return this.pipe.transform(value, this.pipeArgs);
        } else {
            return value ?? null;
        }
    }

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridBodyCell, value?: string): void {
        const transformedvalue = this.transformValue(value);

        if (transformedvalue != null) {
            theme.prepareBodyCellFont(canvas, cell);
            canvas.drawText(transformedvalue, cell.x + theme.getSpace(1), cell.y + 21, undefined, true, false);
        }
    }

}
