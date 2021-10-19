export interface SpeedgridOptions {

    headerHeight: number;

    rowHeight: number;

    footerHeight: number;

    fullRowSelect?: boolean;

    fullRowHover?: boolean;

    hasFooter?: boolean;

}

export const getDefaultSpeedgridOptions = (): SpeedgridOptions => {
    return {
        headerHeight: 32,
        rowHeight: 32,
        footerHeight: 32,

        fullRowHover: false,
        fullRowSelect: false,
        hasFooter: true
    };
};
