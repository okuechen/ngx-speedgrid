import { ICanvas, FillStyle, StrokeStyle, CanvasFont } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { SpeedgridColumn } from '../interfaces/speedgrid-column';
import { SpeedgridFooterCell } from '../interfaces/speedgrid-footer-cell';
import { SpeedgridHeaderCell } from '../interfaces/speedgrid-header-cell';
import { SpeedgridOptions } from '../interfaces/speedgrid-options';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';

export class SpeedgridTheme implements ISpeedgridTheme {

    protected headerFillStyle = new FillStyle('#999');
    protected bodyFillStyle = new FillStyle('#bbb');
    protected strokeStyle = new StrokeStyle('#333', 1);
    protected fontStyle = new CanvasFont(14, 'Segoe UI');

    constructor() {

    }

    public startDrawing(canvas: ICanvas, columns: SpeedgridColumn<any>[], options: SpeedgridOptions): void {

    }

    public startDrawingHeader(canvas: ICanvas): void {
        this.fontStyle.fontWeight = 'bold';
        canvas.setFont(this.fontStyle);
    }

    public drawHeaderCell(canvas: ICanvas, cell: SpeedgridHeaderCell): void {
        canvas.setFillStyle(this.headerFillStyle);
        canvas.setStrokeStyle(this.strokeStyle);

        canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
    }

    public startDrawingBody(canvas: ICanvas): void {
        this.fontStyle.fontWeight = 'normal';
        canvas.setFont(this.fontStyle);
    }

    public drawBodyCell(canvas: ICanvas, cell: SpeedgridBodyCell): void {
        canvas.setFillStyle(this.bodyFillStyle);
        canvas.setStrokeStyle(this.strokeStyle);

        canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
    }

    public startDrawingFooter(canvas: ICanvas): void {
        this.fontStyle.fontWeight = 'bold';
        canvas.setFont(this.fontStyle);
    }

    public drawFooterCell(canvas: ICanvas, cell: SpeedgridFooterCell): void {
        canvas.setFillStyle(this.headerFillStyle);
        canvas.setStrokeStyle(this.strokeStyle);

        canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
    }

    public finishDrawing(canvas: ICanvas): void {

    }

}
