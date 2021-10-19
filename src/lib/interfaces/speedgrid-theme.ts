import { SpeedgridBodyCell } from './speedgrid-body-cell';
import { SpeedgridHeaderCell } from './speedgrid-header-cell';
import { SpeedgridFooterCell } from './speedgrid-footer-cell';
import { ICanvas } from 'angular-canvas-base';

export interface ISpeedgridTheme {

    drawHeaderCell(canvas: ICanvas, cell: SpeedgridHeaderCell): void;

    drawBodyCell(canvas: ICanvas, cell: SpeedgridBodyCell): void;

    drawFooterCell(canvas: ICanvas, cell: SpeedgridFooterCell): void;
}
