import { PipeTransform } from '@angular/core';

import { ICanvas } from 'angular-canvas-base';
import { ISpeedgridTheme } from '../../interfaces/speedgrid-theme';
import { ISpeedgridCellRenderer } from '../../interfaces/speedgrid-cell-renderer';
import { SpeedgridFooterCell } from '../../interfaces/speedgrid-footer-cell';

export class SpeedgridFooterCellRendererDefault implements ISpeedgridCellRenderer<SpeedgridFooterCell, string> {
    protected pipeArgs: any[] | undefined;

    constructor(protected pipe?: PipeTransform, ...pipeArgs: any[]) {
        this.pipeArgs = pipeArgs.length > 0 ? pipeArgs : undefined;
    }

    public transformValue(value?: string): string | null {
        if (this.pipe) {
            return this.pipe.transform(value, this.pipeArgs);
        } else {
            return value ?? null;
        }
    }

    public draw(canvas: ICanvas, theme: ISpeedgridTheme, cell: SpeedgridFooterCell, value?: string): void {

    }

}
