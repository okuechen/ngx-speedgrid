import { ICanvas, FillStyle, StrokeStyle, CanvasFont } from '../../../../angular-canvas-base/src/public-api';
import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { SpeedgridFooterCell } from '../interfaces/speedgrid-footer-cell';
import { SpeedgridHeaderCell } from '../interfaces/speedgrid-header-cell';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';
import { ICorners } from '../../../../angular-canvas-base/src/lib/interfaces/canvas.interface';
import { SpeedgridColumn } from '../interfaces/speedgrid-column';
import { SpeedgridOptions } from '../interfaces/speedgrid-options';
import { SpeedgridCell } from '../interfaces/speedgrid-cell';

export class SpeedgridThemeDark implements ISpeedgridTheme {

    protected spaces = [0, 4, 8, 12, 16, 24, 32 ];
    protected blackFillStyle = new FillStyle('#000');
    protected greyFillStyle = new FillStyle('#AAA');
    protected whiteFillStyle = new FillStyle('#FFF');
    protected strokeStyle = new StrokeStyle('#555', 1);
    protected fontStyleNormal = new CanvasFont(14, 'Arial');
    protected fontStyleBold = new CanvasFont(14, 'Arial');

    private numColumns = 0;

    constructor() {
        this.fontStyleNormal.fontWeight = 'normal';
        this.fontStyleBold.fontWeight = 'bold';
    }

    public startDrawing(canvas: ICanvas, columns: SpeedgridColumn<any>[], options: SpeedgridOptions): void {
        this.numColumns = columns.length;
    }

    public startDrawingHeader(canvas: ICanvas): void {

    }

    public drawHeaderCell(canvas: ICanvas, cell: SpeedgridHeaderCell): void {
        canvas.setFillStyle(this.blackFillStyle);
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

    }

    public drawBodyCell(canvas: ICanvas, cell: SpeedgridBodyCell): void {
        canvas.setFillStyle(this.whiteFillStyle);
        canvas.setStrokeStyle(this.strokeStyle);

        canvas.drawRect(cell.x, cell.y, cell.width, cell.height, true, true);
    }

    public startDrawingFooter(canvas: ICanvas): void {

    }

    public drawFooterCell(canvas: ICanvas, cell: SpeedgridFooterCell): void {
        canvas.setFillStyle(this.blackFillStyle);
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

    public getSpace(spaceIndex: number): number {
        return this.spaces[spaceIndex] ?? 0;
    }

    public prepareHeaderCellFont(canvas: ICanvas, cell: SpeedgridHeaderCell): void {
        if (cell.isHovered) {
            canvas.setFillStyle(this.greyFillStyle);
        } else {
            canvas.setFillStyle(this.whiteFillStyle);
        }

        canvas.setFont(this.fontStyleBold);
    }

    public prepareBodyCellFont(canvas: ICanvas, cell: SpeedgridBodyCell): void {
        canvas.setFillStyle(this.blackFillStyle);

        if (cell.isHovered) {
            canvas.setFont(this.fontStyleBold);
        } else {
            canvas.setFont(this.fontStyleNormal);
        }
    }

    public prepareFooterCellFont(canvas: ICanvas, cell: SpeedgridFooterCell): void {

    }

}
