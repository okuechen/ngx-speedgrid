/// <reference types="resize-observer-browser" />

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
    ElementRef, Renderer2, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { SpeedgridColumn } from './interfaces/speedgrid-column';
import { SpeedgridLocation } from './interfaces/speedgrid-location';
import { getDefaultSpeedgridOptions, SpeedgridOptions } from './interfaces/speedgrid-options';
import { ISpeedgridTheme } from './interfaces/speedgrid-theme';
import { SpeedgridTheme } from './themes/speedgrid-theme';
import { CanvasSpeedgridChildComponent } from './canvas/canvas-speedgrid-child.component';
import { SpeedgridOrderByPair } from './interfaces/speedgrid-orderby-pair';

@Component({
    selector: 'canvas-speedgrid',
    templateUrl: './canvas-speedgrid.component.html',
    styleUrls: ['./canvas-speedgrid.component.scss']
})
export class CanvasSpeedgridComponent<Entity = any> implements AfterContentInit, OnChanges, OnDestroy {
    @ViewChild('canvas') public canvas!: CanvasSpeedgridChildComponent;
    @ViewChild('content') public content!: ElementRef;

    @Input() public columns: SpeedgridColumn<Entity>[] = [];

    @Input() public options: SpeedgridOptions = getDefaultSpeedgridOptions();

    @Input() public theme: ISpeedgridTheme = new SpeedgridTheme();

    @Input() public data?: Entity[] = [];

    @Output() public clicked: EventEmitter<SpeedgridLocation> = new EventEmitter<SpeedgridLocation>();
    @Output() public hoveredCellsChanged: EventEmitter<Readonly<SpeedgridLocation[]>> = new EventEmitter();
    @Output() public selectedCellsChanged: EventEmitter<Readonly<SpeedgridLocation[]>> = new EventEmitter();
    @Output() public orderByChanged: EventEmitter<Readonly<SpeedgridOrderByPair[]>> = new EventEmitter();

    public scrollOffsetX = 0;
    public scrollOffsetY = 0;

    private contentWidth = 0;
    private contentHeight = 0;
    private containerWidth = 0;
    private containerHeight = 0;

    private observer: ResizeObserver | null = null;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2)
    {
    }

    public ngAfterContentInit(): void {
        this.observer = new ResizeObserver(entries => {
            entries.forEach((entry: ResizeObserverEntry) => {
                this.containerWidth = entry.contentRect.width;
                this.containerHeight = entry.contentRect.height;
            });

            this.resize();
        });

        this.observer.observe(this.elementRef.nativeElement);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        let resize = false;

        if (changes.columns != null) {
            let fullWidth = 0;
            this.columns?.forEach(col => fullWidth += col.width);
            this.contentWidth = fullWidth;
            resize = true;
        }

        if (changes.data != null) {
            this.contentHeight = (this.data?.length ?? 0) * this.options.rowHeight;
            resize = true;
        }

        if (resize) {
            this.resize();
        }
    }

    public ngOnDestroy(): void {
        if (this.observer) {
            this.observer.unobserve(this.elementRef.nativeElement);
        }
    }

    public onScroll(event: any): void {
        this.scrollOffsetX = event.target.scrollLeft;
        this.scrollOffsetY = event.target.scrollTop;
    }

    public resize(): void {
        if (this.content) {
            this.renderer.setStyle(this.content.nativeElement, 'width', `${ this.contentWidth }px`);
            this.renderer.setStyle(this.content.nativeElement, 'height', `${ this.contentHeight }px`);
        }

        if (this.canvas) {
            this.canvas.resize(this.containerWidth, this.containerHeight);
        }
    }

}
