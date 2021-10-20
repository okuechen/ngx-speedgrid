import { SpeedgridBodyCell } from './speedgrid-body-cell';
import { SpeedgridHeaderCell } from './speedgrid-header-cell';
import { SpeedgridFooterCell } from './speedgrid-footer-cell';
import { ICanvas } from 'angular-canvas-base';

export interface ISpeedgridTheme {

    startDrawing(canvas: ICanvas): void;

    startDrawingHeader(canvas: ICanvas): void;

    drawHeaderCell(canvas: ICanvas, cell: SpeedgridHeaderCell): void;

    startDrawingBody(canvas: ICanvas): void;

    drawBodyCell(canvas: ICanvas, cell: SpeedgridBodyCell): void;

    startDrawingFooter(canvas: ICanvas): void;

    drawFooterCell(canvas: ICanvas, cell: SpeedgridFooterCell): void;

    finishDrawing(canvas: ICanvas): void;
}
