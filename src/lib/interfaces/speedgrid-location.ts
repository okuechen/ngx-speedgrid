import { SpeedgridCellType } from '../enums/speedgrid-cell-type';

/**
 * Defines a location of a cell.
 */
export interface SpeedgridLocation {

    /**
     * Cell type of the location
     */
    readonly cellType: SpeedgridCellType;

    /**
     * Horizontal position of this cell (index)
     */
    readonly tablePositionX: number;

    /**
     * Vertical position of this cell (index)
     */
    readonly tablePositionY?: number;

    /**
     * Horizontal position of this cell (pixel)
     */
    readonly x: number;

    /**
     * Vertical position of this cell (pixel)
     */
    readonly y: number;
}
