import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type SpeedgridImage = HTMLImageElement | null | undefined;

/**
 * This service is used to store images rendered inside speedgrids (globally), so no image will be loaded more than once.
 * Right now, this is only used by [[SpeedgridBodyCellRendererImage]]
 */
@Injectable({
    providedIn: 'root'
})
export class SpeedgridImageStorageService {
    public imageUpdated: Subject<string> = new Subject();

    private imageStorage: {[path: string]: SpeedgridImage } = {};

    public getImage(path: string): SpeedgridImage {
        if (this.imageStorage[path] !== undefined) {
            return this.imageStorage[path];
        }

        const newImage = new Image();

        newImage.onload = evt => {
            this.imageStorage[path] = newImage;
            this.imageUpdated.next(path);
        };

        newImage.onerror = evt => {
            this.imageStorage[path] = null;
            this.imageUpdated.next(path);
        };

        newImage.src = path;
        return undefined;
    }

    // TODO: remove not used images
}
