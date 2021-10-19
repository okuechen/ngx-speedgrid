import { ICanvas, FillStyle, StrokeStyle } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { SpeedgridFooterCell } from '../interfaces/speedgrid-footer-cell';
import { SpeedgridHeaderCell } from '../interfaces/speedgrid-header-cell';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';

export class SpeedgridTheme implements ISpeedgridTheme {

    protected headerFillStyle = new FillStyle('#999');
    protected bodyFillStyle = new FillStyle('#bbb');
    protected strokeStyle = new StrokeStyle('#333', 1);

    constructor() {

    }

    public drawHeaderCell(canvas: ICanvas, cell: SpeedgridHeaderCell): void {
        canvas.setFillStyle(this.headerFillStyle);
        canvas.setStrokeStyle(this.strokeStyle);

        canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
    }

    public drawBodyCell(canvas: ICanvas, cell: SpeedgridBodyCell): void {
        canvas.setFillStyle(this.bodyFillStyle);
        canvas.setStrokeStyle(this.strokeStyle);

        canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
    }

    public drawFooterCell(canvas: ICanvas, cell: SpeedgridFooterCell): void {
        canvas.setFillStyle(this.headerFillStyle);
        canvas.setStrokeStyle(this.strokeStyle);

        canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
    }

}
