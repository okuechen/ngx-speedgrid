import { PipeTransform } from '@angular/core';

import { ICanvas } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../../interfaces/speedgrid-body-cell';
import { ISpeedgridTheme } from '../../interfaces/speedgrid-theme';
import { ISpeedgridCellRenderer } from '../../interfaces/speedgrid-cell-renderer';

/**
 * Body cell renderer for boolean values. If you do not use a pipe (for translation maybe), it simply
 * renders a Yes or No instead of the boolean value.
 */
export class SpeedgridBodyCellRendererBoolean implements ISpeedgridCellRenderer<SpeedgridBodyCell, boolean> {
    protected pipeArgs: any[] | undefined;

    constructor(protected pipe?: PipeTransform, ...pipeArgs: any[]) {
        this.pipeArgs = pipeArgs.length > 0 ? pipeArgs : undefined;
    }

    public transformValue(value?: boolean): string | null {
        if (this.pipe) {
            return this.pipe.transform(value, this.pipeArgs);
        } else {
            return value ? 'Yes' : 'No';
        }
    }

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridBodyCell, value?: boolean): void {
        const transformedvalue = this.transformValue(value);

        if (transformedvalue != null) {
            theme.prepareBodyCellFont(canvas, cell);
            canvas.drawText(transformedvalue, cell.x + theme.getSpace(1), cell.y + 21, undefined, true, false);
        }
    }

}
