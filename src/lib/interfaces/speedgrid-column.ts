import { ISpeedgridTransform } from './speedgrid-transform';

export interface SpeedgridColumn<Entity> {

    width: number;

    property: (string & {}) | keyof Entity;

    label: string;

    transform?: ISpeedgridTransform<any>;

    isOrderable?: boolean;

    isResizeable?: boolean;

    isDragable?: boolean;

}
