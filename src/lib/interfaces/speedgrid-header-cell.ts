import { SpeedgridOrderBy } from '../enums/speedgrid-orderby';
import { SpeedgridCell } from './speedgrid-cell';

export interface SpeedgridHeaderCell extends SpeedgridCell {

    property: string;

    orderby: SpeedgridOrderBy;
}
