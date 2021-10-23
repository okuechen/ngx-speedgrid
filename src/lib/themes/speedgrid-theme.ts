import { ICanvas, FillStyle, StrokeStyle, CanvasFont } from '../../../../angular-canvas-base/src/public-api';
import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { SpeedgridCell } from '../interfaces/speedgrid-cell';
import { SpeedgridColumn } from '../interfaces/speedgrid-column';
import { SpeedgridFooterCell } from '../interfaces/speedgrid-footer-cell';
import { SpeedgridHeaderCell } from '../interfaces/speedgrid-header-cell';
import { SpeedgridOptions } from '../interfaces/speedgrid-options';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';

export class SpeedgridTheme implements ISpeedgridTheme {

    protected spaces = [0, 4, 8, 12, 16, 24, 32 ];
    protected headerFillStyle = new FillStyle('#999');
    protected bodyFillStyle = new FillStyle('#bbb');
    protected selectedFillStyle = new FillStyle('#DDD');
    protected strokeStyle = new StrokeStyle('#333', 1);
    protected fontStyleNormal = new CanvasFont(14, 'Segoe UI');
    protected fontStyleBold = new CanvasFont(14, 'Segoe UI');
    protected fontFillStyle = new FillStyle('#000');

    constructor() {
        this.fontStyleNormal.fontWeight = 'normal';
        this.fontStyleBold.fontWeight = 'bold';
    }

    public startDrawing(canvas: ICanvas, columns: SpeedgridColumn<any>[], options: SpeedgridOptions): void {

    }

    public startDrawingHeader(canvas: ICanvas): void {

    }

    public drawHeaderCell(canvas: ICanvas, cell: SpeedgridHeaderCell): void {
        if (cell.isHovered) {
            canvas.setFillStyle(this.bodyFillStyle);
        } else {
            canvas.setFillStyle(this.headerFillStyle);
        }
        canvas.setStrokeStyle(this.strokeStyle);

        canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
    }

    public startDrawingBody(canvas: ICanvas): void {

    }

    public drawBodyCell(canvas: ICanvas, cell: SpeedgridBodyCell): void {
        if (cell.isSelected) {
            canvas.setFillStyle(this.selectedFillStyle);
        } else {
            if (cell.isHovered) {
                canvas.setFillStyle(this.headerFillStyle);
            } else {
                canvas.setFillStyle(this.bodyFillStyle);
            }
        }

        canvas.setStrokeStyle(this.strokeStyle);

        canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
    }

    public startDrawingFooter(canvas: ICanvas): void {

    }

    public drawFooterCell(canvas: ICanvas, cell: SpeedgridFooterCell): void {
        canvas.setFillStyle(this.headerFillStyle);
        canvas.setStrokeStyle(this.strokeStyle);

        canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
    }

    public finishDrawing(canvas: ICanvas): void {

    }

    public getSpace(spaceIndex: number): number {
        return this.spaces[spaceIndex] ?? 0;
    }

    public prepareHeaderCellFont(canvas: ICanvas, cell: SpeedgridHeaderCell): void {
        canvas.setFillStyle(this.fontFillStyle);
        canvas.setFont(this.fontStyleBold);
    }

    public prepareBodyCellFont(canvas: ICanvas, cell: SpeedgridBodyCell): void {
        canvas.setFillStyle(this.fontFillStyle);
        canvas.setFont(this.fontStyleNormal);
    }

    public prepareFooterCellFont(canvas: ICanvas, cell: SpeedgridFooterCell): void {

    }

}
