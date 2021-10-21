import { ICanvas } from 'angular-canvas-base';
import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { ISpeedgridTheme } from '../interfaces/speedgrid-theme';
import { ISpeedgridTransform } from '../interfaces/speedgrid-transform';

export class SpeedgridTransformImage implements ISpeedgridTransform<string> {

    constructor(public maxWidth: number, public maxHeight: number) {

    }

    public transformValue(value: string): string {
        return value;
    }

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridBodyCell, value: string): void {
        
    }

}
