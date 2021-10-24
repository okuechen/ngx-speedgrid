import { ICanvas } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../../interfaces/speedgrid-body-cell';
import { ISpeedgridTheme } from '../../interfaces/speedgrid-theme';
import { ISpeedgridCellRenderer } from '../../interfaces/speedgrid-cell-renderer';
import { SpeedgridImageStorageService } from '../../services/speedgrid-image-storage.service';

/**
 * The image cell renderer draws icons or images into a cell, depending on width and height parameters.
 * The [[SpeedgridImageStorageService]] is used to store a given image, to prevent 10k rows to load their own
 * instance of an image, even though it is always the same.
 */
export class SpeedgridBodyCellRendererImage implements ISpeedgridCellRenderer<SpeedgridBodyCell, string> {

    constructor(protected imageStorageService: SpeedgridImageStorageService, public width: number, public height: number) {

    }

    public transformValue(value?: string): string | null {
        return value ?? null;
    }

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridBodyCell, value?: string): void {
        const transformedValue = this.transformValue(value);

        if (transformedValue != null) {
            const image = this.imageStorageService.getImage(transformedValue);
            const hoveredMod = cell.isHovered ? 2 : 0;

            if (image) {
                canvas.drawImage(image, cell.x + (cell.width / 2) - (this.width / 2) - hoveredMod,
                    cell.y + (cell.height / 2) - (this.height / 2) - hoveredMod,
                    this.width + (hoveredMod * 2), this.height + (hoveredMod * 2));
            }
        }
    }

}
