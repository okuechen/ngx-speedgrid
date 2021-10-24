import { PipeTransform } from '@angular/core';

import { ICanvas } from 'angular-canvas-base';
import { ISpeedgridTheme } from '../../interfaces/speedgrid-theme';
import { ISpeedgridCellRenderer } from '../../interfaces/speedgrid-cell-renderer';
import { SpeedgridHeaderCell } from '../../interfaces/speedgrid-header-cell';
import { SpeedgridOrderBy } from '../../enums/speedgrid-orderby';

/**
 * Default header cell renderer, rendering the label left in the cell. If the cell is ordered, an arrow will be rendered
 * at the right side.
 */
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
        theme.prepareHeaderCellFont(canvas, cell);

        const transformedvalue = this.transformValue(value);
        if (transformedvalue != null) {
            canvas.drawText(transformedvalue, cell.x + 4, cell.y + 21, cell.width, true, false);
        }

        if (cell.orderby === SpeedgridOrderBy.ASC) {
            const metrics = canvas.measureText('˄');
            canvas.drawText('˄', cell.x + cell.width - 4 - metrics.width, cell.y + 21, cell.width, true, false);
        } else if (cell.orderby === SpeedgridOrderBy.DESC) {
            const metrics = canvas.measureText('˅');
            canvas.drawText('˅', cell.x + cell.width - 4 - metrics.width, cell.y + 21, cell.width, true, false);
        }
    }

}
