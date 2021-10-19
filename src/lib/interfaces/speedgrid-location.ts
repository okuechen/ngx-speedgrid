import { SpeedgridVisualType } from '../enums/speedgrid-visual-type';

export interface SpeedgridLocation {

    readonly visualType: SpeedgridVisualType;

    readonly tablePositionX: number;

    readonly tablePositionY?: number;

}
