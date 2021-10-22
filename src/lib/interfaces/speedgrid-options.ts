export interface SpeedgridOptions {

    headerHeight: number;

    rowHeight: number;

    footerHeight: number;

    multiSelect?: boolean;

    multiOrderable?: boolean;

    fullRowSelect?: boolean;

    fullRowHover?: boolean;

    hasFooter?: boolean;

}

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
