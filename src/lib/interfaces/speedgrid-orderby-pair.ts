import { SpeedgridOrderBy } from '../enums/speedgrid-orderby';

/**
 * Used by the event raised if used clicked a header to order.
 */
export interface SpeedgridOrderByPair {

    /**
     * Bound property of the given entity in [[SpeedgridColumn]] that should be ordered.
     */
    property: string;

    /**
     * Direction of the ordering.
     */
    direction: SpeedgridOrderBy;
}
