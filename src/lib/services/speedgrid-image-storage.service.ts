import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type SpeedgridImage = HTMLImageElement | null | undefined;

@Injectable({
    providedIn: 'root'
})
export class SpeedgridImageStorageService {
    public onImageUpdated: Subject<string> = new Subject();

    private imageStorage: {[path: string]: SpeedgridImage } = {};

    public getImage(path: string): SpeedgridImage {
        if (this.imageStorage[path] !== undefined) {
            return this.imageStorage[path];
        }

        const newImage = new Image();

        newImage.onload = evt => {
            this.imageStorage[path] = newImage;
            this.onImageUpdated.next(path);
        };

        newImage.onerror = evt => {
            this.imageStorage[path] = null;
            this.onImageUpdated.next(path);
        };

        newImage.src = path;
        return undefined;
    }

    // TODO: remove not used images
}
