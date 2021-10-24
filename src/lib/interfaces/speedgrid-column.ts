import { ISpeedgridCellRenderer } from './speedgrid-cell-renderer';
import { SpeedgridCell } from './speedgrid-cell';

/**
 * Used to define a Speedgrid column.
 */
export interface SpeedgridColumn<Entity> {

    /**
     * Width of the cell in pixel.
     */
    width: number;

    /**
     * Bound property of this cell, can be a path or simply a root property of the Entity.
     */
    property: (string & {}) | keyof Entity;

    /**
     * Label of the header. Can also be a path or id, if a translation pipe is used in cell renderer.
     */
    label: string;

    /**
     * Header cell renderer that should be used for this column header.
     * If not given, [[SpeedgridHeaderCellRendererDefault]] will be used.
     */
    headerCellRenderer?: ISpeedgridCellRenderer<SpeedgridCell, any>;

    /**
     * Body cell renderer that should be used for this column body cells.
     * If not given, [[SpeedgridBodyCellRendererString]] will be used.
     */
    bodyCellRenderer?: ISpeedgridCellRenderer<SpeedgridCell, any>;

    /**
     * Footer cell renderer that should be used for this column footer, if activated in options.
     * If not given, [[SpeedgridFooterCellRendererDefault]] will be used.
     */
    footerCellRenderer?: ISpeedgridCellRenderer<SpeedgridCell, any>;

    /**
     * Define if this column is orderable. If NOT false, ordering will be active and raise events.
     */
    isOrderable?: boolean;

    /**
     * Define if this column is resizeable. If NOT false, header resizing will be active and raise events.
     */
    isResizeable?: boolean;

}
