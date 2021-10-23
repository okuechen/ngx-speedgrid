import { ICanvas } from 'angular-canvas-base';

import { SpeedgridBodyCell } from './speedgrid-body-cell';
import { SpeedgridHeaderCell } from './speedgrid-header-cell';
import { SpeedgridFooterCell } from './speedgrid-footer-cell';
import { SpeedgridColumn } from './speedgrid-column';
import { SpeedgridOptions } from './speedgrid-options';

export interface ISpeedgridTheme {

    startDrawing(canvas: ICanvas, columns: SpeedgridColumn<any>[], options: SpeedgridOptions): void;

    startDrawingHeader(canvas: ICanvas): void;

    drawHeaderCell(canvas: ICanvas, cell: SpeedgridHeaderCell): void;

    startDrawingBody(canvas: ICanvas): void;

    drawBodyCell(canvas: ICanvas, cell: SpeedgridBodyCell): void;

    startDrawingFooter(canvas: ICanvas): void;

    drawFooterCell(canvas: ICanvas, cell: SpeedgridFooterCell): void;

    finishDrawing(canvas: ICanvas): void;

    prepareHeaderCellFont(canvas: ICanvas, cell: SpeedgridHeaderCell): void;

    prepareBodyCellFont(canvas: ICanvas, cell: SpeedgridBodyCell): void;

    prepareFooterCellFont(canvas: ICanvas, cell: SpeedgridFooterCell): void;

    getSpace(spaceIndex: number): number;

}
