import { FillStyle, ICanvas } from '../../../../../angular-canvas-base/src/public-api';
import { SpeedgridBodyCell } from '../../interfaces/speedgrid-body-cell';
import { ISpeedgridTheme } from '../../interfaces/speedgrid-theme';
import { ISpeedgridCellRenderer } from '../../interfaces/speedgrid-cell-renderer';

export class SpeedgridBodyCellRendererBoolean implements ISpeedgridCellRenderer<SpeedgridBodyCell, boolean> {

    public transformValue(value?: boolean): string | null {
        return value != null ? value.toString() : null;
    }

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridBodyCell, value?: boolean): void {
        theme.prepareBodyCellFont(canvas, cell);
        canvas.drawText(value ? 'Yes' : 'No', cell.x + 4, cell.y + 21, undefined, true, false);
    }

}
