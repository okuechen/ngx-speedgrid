import { PipeTransform } from '@angular/core';

import { ICanvas } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../../interfaces/speedgrid-body-cell';
import { ISpeedgridTheme } from '../../interfaces/speedgrid-theme';
import { ISpeedgridCellRenderer } from '../../interfaces/speedgrid-cell-renderer';

/**
 * The numer body cell renderer uses a pipe to transform number values, usually for floats or currency.
 * If you do not provide a pipe, the number will be simply transformed to string before drawing.
 */
export class SpeedgridBodyCellRendererNumber implements ISpeedgridCellRenderer<SpeedgridBodyCell, number> {
    protected pipeArgs: any[] | undefined;

    constructor(protected pipe?: PipeTransform, ...pipeArgs: any[]) {
        this.pipeArgs = pipeArgs.length > 0 ? pipeArgs : undefined;
    }

    public transformValue(value?: number): string | null {
        if (this.pipe) {
            return this.pipe.transform(value, this.pipeArgs);
        } else {
            return value == null ? null : `${value}`;
        }
    }

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridBodyCell, value?: number): void {
        const transformedvalue = this.transformValue(value);

        if (transformedvalue != null) {
            theme.prepareBodyCellFont(canvas, cell);
            const textMetrics = canvas.measureText(transformedvalue);
            canvas.drawText(transformedvalue, cell.x + cell.width - theme.getSpace(1) -
                textMetrics.width, cell.y + 21, undefined, true, false);
        }
    }

}
