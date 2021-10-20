import { ICanvas, FillStyle, StrokeStyle, CanvasFont } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { SpeedgridFooterCell } from '../interfaces/speedgrid-footer-cell';
import { SpeedgridHeaderCell } from '../interfaces/speedgrid-header-cell';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';
import { ICorners } from '../../../../angular-canvas-base/src/lib/interfaces/canvas.interface';
import { SpeedgridColumn } from '../interfaces/speedgrid-column';
import { SpeedgridOptions } from '../interfaces/speedgrid-options';

export class SpeedgridThemeDark implements ISpeedgridTheme {

    protected headerFillStyle = new FillStyle('#000');
    protected bodyFillStyle = new FillStyle('#FFF');
    protected strokeStyle = new StrokeStyle('#555', 1);
    protected fontStyle = new CanvasFont(14, 'Arial');

    private numColumns = 0;

    constructor() {

    }

    public startDrawing(canvas: ICanvas, columns: SpeedgridColumn<any>[], options: SpeedgridOptions): void {
        this.numColumns = columns.length;
    }

    public startDrawingHeader(canvas: ICanvas): void {
        this.fontStyle.fontWeight = 'bold';
        canvas.setFont(this.fontStyle);
    }

    public drawHeaderCell(canvas: ICanvas, cell: SpeedgridHeaderCell): void {
        canvas.setFillStyle(this.headerFillStyle);
        canvas.setStrokeStyle(this.strokeStyle);

        if (cell.tablePositionX === 0) {
            const corners: ICorners = {
                topleft: 8,
                topright: 0,
                bottomleft: 0,
                bottomright: 0
            }
            canvas.drawRoundRect(cell.x, cell.y, cell.width, cell.height, corners, true, true);
        } else if (cell.tablePositionX === this.numColumns - 1) {
            const corners: ICorners = {
                topleft: 0,
                topright: 8,
                bottomleft: 0,
                bottomright: 0
            }
            canvas.drawRoundRect(cell.x, cell.y, cell.width, cell.height, corners, true, true);
        } else {
            canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
        }
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

        if (cell.tablePositionX === 0) {
            const corners: ICorners = {
                topleft: 0,
                topright: 0,
                bottomleft: 8,
                bottomright: 0
            }
            canvas.drawRoundRect(cell.x, cell.y, cell.width, cell.height, corners, true, true);
        } else if (cell.tablePositionX === this.numColumns - 1) {
            const corners: ICorners = {
                topleft: 0,
                topright: 0,
                bottomleft: 0,
                bottomright: 8
            }
            canvas.drawRoundRect(cell.x, cell.y, cell.width, cell.height, corners, true, true);
        } else {
            canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
        }
    }

    public finishDrawing(canvas: ICanvas): void {

    }

}
