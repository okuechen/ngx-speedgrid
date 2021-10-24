/**
 * These options define the behavior and visuals of a Speedgrid.
 */
export interface SpeedgridOptions {

    /**
     * Height of headers in pixel.
     */
    headerHeight: number;

    /**
     * Height of rows in pixel.
     */
    rowHeight: number;

    /**
     * Height of footer in pixel.
     */
    footerHeight: number;

    /**
     * Multi or single select body cells.
     */
    multiSelect?: boolean;

    /**
     * Can more than one column be ordered or more.
     */
    multiOrderable?: boolean;

    /**
     * Full row select or single body cell.
     */
    fullRowSelect?: boolean;

    /**
     * Full row hover or single body cell.
     */
    fullRowHover?: boolean;

    /**
     * Defines if the footer is rendered or not.
     */
    hasFooter?: boolean;

}

/**
 * Used by the Speedgrid to define default options if no options are given.
 */
export const getDefaultSpeedgridOptions = (): SpeedgridOptions => {
    return {
        headerHeight: 32,
        rowHeight: 32,
        footerHeight: 32,

        multiSelect: false,
        multiOrderable: false,
        fullRowHover: false,
        fullRowSelect: false,
        hasFooter: false
    };
};
