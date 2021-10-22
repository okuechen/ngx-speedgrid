import { SpeedgridCellType } from '../enums/speedgrid-cell-type';

export interface SpeedgridLocation {

    readonly cellType: SpeedgridCellType;

    readonly tablePositionX: number;

    readonly tablePositionY?: number;

    readonly x: number;

    readonly y: number;
}
