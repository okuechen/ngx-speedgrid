import { ICanvas } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';
import { ISpeedgridTransform } from '../interfaces/speedgrid-transform';
import { SpeedgridImageStorageService } from '../services/speedgrid-image-storage.service';

export class SpeedgridTransformImage implements ISpeedgridTransform<string> {

    constructor(protected imageStorageService: SpeedgridImageStorageService, public width: number, public height: number) {

    }

    public transformValue(value: string): string | null {
        return value;
    }

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridBodyCell, value: string): void {
        const transformedValue = this.transformValue(value);

        if (transformedValue != null) {
            const image = this.imageStorageService.getImage(transformedValue);

            if (image) {
                canvas.drawImage(image, cell.x + (cell.width / 2) - (this.width / 2),
                    cell.y + (cell.height / 2) - (this.height / 2), this.width, this.height);
            }
        }
    }

}
