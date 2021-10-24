import { SpeedgridCell } from './speedgrid-cell';

/**
 * Interface describing body cells of a Speedgrid.
 */
export interface SpeedgridBodyCell extends SpeedgridCell {

    /**
     * Y position on screen and representing index of data row
     */
    tablePositionY: number;

}
