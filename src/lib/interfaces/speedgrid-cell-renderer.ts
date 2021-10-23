import { ICanvas } from 'angular-canvas-base';
import { SpeedgridCell } from './speedgrid-cell';
import { ISpeedgridTheme } from './speedgrid-theme';

export interface ISpeedgridCellRenderer<CellType extends SpeedgridCell, T> {

    transformValue(value?: T): string | null;

    draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: CellType, value?: T): void;

}
