import { ICanvas } from 'angular-canvas-base';

import { SpeedgridBodyCell } from './speedgrid-body-cell';
import { SpeedgridHeaderCell } from './speedgrid-header-cell';
import { SpeedgridFooterCell } from './speedgrid-footer-cell';
import { SpeedgridColumn } from './speedgrid-column';
import { SpeedgridOptions } from './speedgrid-options';

/**
 * This interface defines a Speedgrid theme, used to render a grid. All visuals
 * can be changed within a class implementing this interface. See [[SpeedgridTheme]]
 * for example (used as default if no other theme given to the Speedgrid).
 *
 * Use this to define the look of a Speedgrid fitting to your application, if none of the
 * shipped themes fit.
 */
export interface ISpeedgridTheme {

    /**
     * Called by the Speedgrid when rendering starts. Used to define general options.
     */
    startDrawing(canvas: ICanvas, columns: SpeedgridColumn<any>[], options: SpeedgridOptions): void;

    /**
     * Called before drawing all headers.
     */
    startDrawingHeader(canvas: ICanvas): void;

    /**
     * Draws the cell of a single header. Not the content though, that will be done by cell renderer.
     */
    drawHeaderCell(canvas: ICanvas, cell: SpeedgridHeaderCell): void;

    /**
     * Called before drawing all body cells.
     */
    startDrawingBody(canvas: ICanvas): void;

    /**
     * Draws the cell of a single body. Not the content though, that will be done by cell renderer.
     */
    drawBodyCell(canvas: ICanvas, cell: SpeedgridBodyCell): void;

    /**
     * Called before drawing all footer.
     */
    startDrawingFooter(canvas: ICanvas): void;

    /**
     * Draws the cell of a single footer. Not the content though, that will be done by cell renderer.
     */
    drawFooterCell(canvas: ICanvas, cell: SpeedgridFooterCell): void;

    /**
     * Called after drawing. To reset global settings for example, or free resources.
     */
    finishDrawing(canvas: ICanvas): void;

    /**
     * Called before a header cell renderer draws its content.
     */
    prepareHeaderCellFont(canvas: ICanvas, cell: SpeedgridHeaderCell): void;

    /**
     * Called before a body cell renderer draws its content.
     */
    prepareBodyCellFont(canvas: ICanvas, cell: SpeedgridBodyCell): void;

    /**
     * Called before a footer cell renderer draws its content.
     */
    prepareFooterCellFont(canvas: ICanvas, cell: SpeedgridFooterCell): void;

    /**
     * Called for fixed spaces in the grid. Themes should provide an array of spaces.
     * See [[SpeedgridTheme]] implementation for example.
     */
    getSpace(spaceIndex: number): number;

}
