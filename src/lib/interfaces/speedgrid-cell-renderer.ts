import { ICanvas } from 'angular-canvas-base';
import { SpeedgridCell } from './speedgrid-cell';
import { ISpeedgridTheme } from './speedgrid-theme';

/**
 * Interface for all cell renderers, no matter of which type. Used to transform data before
 * rendering and the rendering itself. These are used inside the column configuration [[SpeedgridColumn]]
 */
export interface ISpeedgridCellRenderer<CellType extends SpeedgridCell, T> {

    /**
     * Transform data before rendering.
     */
    transformValue(value?: T): string | null;

    /**
     * Render the cell using all infos provided as parameter.
     */
    draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: CellType, value?: T): void;

}
