import { ICanvas } from 'angular-canvas-base';
import { SpeedgridBodyCell } from './speedgrid-body-cell';
import { ISpeedgridTheme } from './speedgrid-theme';

export interface ISpeedgridTransform<T> {

    transformValue(value: T): string;

    draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridBodyCell, value: T): void;

}
