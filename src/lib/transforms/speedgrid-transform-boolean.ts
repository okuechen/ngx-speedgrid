import { FillStyle, ICanvas } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';
import { ISpeedgridTransform } from '../interfaces/speedgrid-transform';

export class SpeedgridTransformBoolean implements ISpeedgridTransform<boolean> {

    public transformValue(value: boolean): string | null {
        return value != null ? value.toString() : null;
    }

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridBodyCell, value: boolean): void {
        canvas.setFillStyle(new FillStyle('#000'));
        canvas.drawText(value ? 'Yes' : 'No', cell.x + 4, cell.y + 21, undefined, true, false);
    }

}
