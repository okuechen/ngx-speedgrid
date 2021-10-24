/**
 * Base interface of all cell types of a Speedgrid.
 */
export interface SpeedgridCell {

    /**
     * Horizontal index of the cell
     */
    readonly tablePositionX: number;

    /**
     * Height of the cell in pixel. Use [[getDefaultSpeedgridOptions]] to change.
     */
    readonly height: number;

    /**
     * X position of the cell inside the Speedgrid as pixel.
     */
    x: number;

    /**
     * Y position of the cell inside the Speedgrid as pixel.
     */
    y: number;

    /**
     * Width of the cell in pixel.
     */
    width: number;

    /**
     * Hovering state of the cell.
     */
    isHovered: boolean;

    /**
     * True if the cell is selected.
     */
    isSelected: boolean;

}
