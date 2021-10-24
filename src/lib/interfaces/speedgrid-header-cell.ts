import { SpeedgridOrderBy } from '../enums/speedgrid-orderby';
import { SpeedgridCell } from './speedgrid-cell';

/**
 * Interface for Speedgrid header cells.
 */
export interface SpeedgridHeaderCell extends SpeedgridCell {

    /**
     * Bound property, coming from [[SpeedgridColumn]].
     */
    property: string;

    /**
     * Current orderBy state for this header.
     */
    orderby: SpeedgridOrderBy;
}
