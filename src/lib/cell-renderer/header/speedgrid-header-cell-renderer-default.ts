import { PipeTransform } from '@angular/core';

import { FillStyle, ICanvas } from '../../../../../angular-canvas-base/src/public-api';
import { ISpeedgridTheme } from '../../interfaces/speedgrid-theme';
import { ISpeedgridCellRenderer } from '../../interfaces/speedgrid-cell-renderer';
import { SpeedgridHeaderCell } from '../../interfaces/speedgrid-header-cell';

export class SpeedgridHeaderCellRendererDefault implements ISpeedgridCellRenderer<SpeedgridHeaderCell, string> {
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

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridHeaderCell, value?: string): void {
        const transformedvalue = this.transformValue(value);

        if (transformedvalue != null) {
            theme.prepareHeaderCellFont(canvas, cell);
            canvas.drawText(transformedvalue, cell.x + 4, cell.y + 21, cell.width, true, false);
        }
    }

}
