import { ISpeedgridCellRenderer } from './speedgrid-cell-renderer';
import { SpeedgridCell } from './speedgrid-cell';

export interface SpeedgridColumn<Entity> {

    width: number;

    property: (string & {}) | keyof Entity;

    label: string;

    headerCellRenderer?: ISpeedgridCellRenderer<SpeedgridCell, any>;

    bodyCellRenderer?: ISpeedgridCellRenderer<SpeedgridCell, any>;

    footerCellRenderer?: ISpeedgridCellRenderer<SpeedgridCell, any>;

    isOrderable?: boolean;

    isResizeable?: boolean;

    isDragable?: boolean;

}
