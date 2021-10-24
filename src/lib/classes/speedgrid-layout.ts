import * as _ from 'lodash';
import { Subject } from 'rxjs';

import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { SpeedgridColumn } from '../interfaces/speedgrid-column';
import { SpeedgridFooterCell } from '../interfaces/speedgrid-footer-cell';
import { SpeedgridHeaderCell } from '../interfaces/speedgrid-header-cell';
import { SpeedgridOptions } from '../interfaces/speedgrid-options';
import { SpeedgridLocation } from '../interfaces/speedgrid-location';
import { SpeedgridCellType } from '../enums/speedgrid-cell-type';
import { SpeedgridOrderBy } from '../enums/speedgrid-orderby';
import { SpeedgridOrderByPair } from '../interfaces/speedgrid-orderby-pair';

interface SpeedgridBodyRow {

    cells: SpeedgridBodyCell[];

}

export class SpeedgridLayout {

    public hoveredCellsChanged: Subject<Readonly<SpeedgridLocation[]>> = new Subject();
    public selectedCellsChanged: Subject<Readonly<SpeedgridLocation[]>> = new Subject();
    public orderByChanged: Subject<Readonly<SpeedgridOrderByPair[]>> = new Subject();
    public cursorChanged: Subject<string> = new Subject();
    public headerResized: Subject<SpeedgridHeaderCell> = new Subject();

    protected headerCells: SpeedgridHeaderCell[] = [];
    protected bodyRows: SpeedgridBodyRow[] = [];
    protected footerCells: SpeedgridFooterCell[] = [];

    protected hoveredCells: SpeedgridLocation[] = [];
    protected selectedCells: SpeedgridLocation[] = [];
    protected lastPointerPosition?: SpeedgridLocation;

    protected maxVisibleRows = 0;
    protected headerHeight = 0;
    protected rowHeight = 0;
    protected footerHeight = 0;
    protected gridHeight = 0;
    protected currentCursor = 'default';

    protected resizingHeader?: SpeedgridHeaderCell;

    public recalcLayout(columns: SpeedgridColumn<any>[], options: SpeedgridOptions, height: number,
                        rebuild: boolean = true, removeSelected: boolean = false): void
    {
        this.gridHeight = height;
        this.headerHeight = options.headerHeight;
        this.rowHeight = options.rowHeight;
        this.footerHeight = (options.hasFooter ? options.footerHeight : 0);
        this.maxVisibleRows = Math.ceil((this.gridHeight - (this.headerHeight + this.footerHeight)) / this.rowHeight) + 1;

        if (rebuild) {
            this.headerCells = columns.map((col, index) => ({
                x: 0,
                y: 0,
                width: col.width,
                height: options.headerHeight,
                tablePositionX: index,
                isHovered: false,
                isSelected: false,
                property: col.property.toString(),
                orderby: SpeedgridOrderBy.NONE
            }));

            if (options.hasFooter) {
                this.footerCells = columns.map((col, index) => ({
                    x: 0,
                    y: 0,
                    width: col.width,
                    height: options.headerHeight,
                    tablePositionX: index,
                    isHovered: false,
                    isSelected: false
                }));
            }
        }

        this.bodyRows = [];
        for ( let y = 0; y < this.maxVisibleRows; y ++) {
            const newRow: SpeedgridBodyRow = {
                cells: []
            };

            for ( let x = 0; x < columns.length; x ++) {
                newRow.cells.push({
                    x: 0,
                    y: 0,
                    width: columns[x].width,
                    height: options.rowHeight,
                    tablePositionX: x,
                    tablePositionY: 0,
                    isHovered: false,
                    isSelected: false
                });
            }

            this.bodyRows.push(newRow);
        }

        if (removeSelected) {
            this.selectedCells = [];
            this.selectedCellsChanged.next(this.selectedCells);
        }
    }

    public prepareVisibleHeaderCells(offsetX: number, offsetY: number, cellCallback: (cell: SpeedgridHeaderCell) => void): void {
        let x = 0;
        this.headerCells.forEach(cell => {
            if (cell.width + x > offsetX) {
                cell.x = x - offsetX;
                cell.isHovered = this.hoveredCells.find(hovered =>
                    hovered.cellType === SpeedgridCellType.HEADER && hovered.tablePositionX === cell.tablePositionX) != null;

                cellCallback(cell);
            }

            x += cell.width;
        });
    }

    public prepareVisibleBodyCells(offsetX: number, offsetY: number, cellCallback: (cell: SpeedgridBodyCell) => void): void {
        const rowOffset = offsetY % this.rowHeight;
        let y = this.headerHeight - rowOffset;
        let posY = Math.ceil(offsetY / this.rowHeight) + (rowOffset ? 0 : 1 );

        this.bodyRows.forEach(row => {
            let x = 0;

            row.cells.forEach(cell => {
                if (cell.width + x > offsetX) {
                    cell.x = x - offsetX;
                    cell.y = y;
                    cell.tablePositionY = posY;
                    cell.isHovered = this.hoveredCells.find(hovered =>
                        hovered.cellType === SpeedgridCellType.BODY &&
                        hovered.tablePositionX === cell.tablePositionX &&
                        hovered.tablePositionY === cell.tablePositionY) != null;

                    cell.isSelected = this.selectedCells.find(selected =>
                        selected.tablePositionX === cell.tablePositionX &&
                        selected.tablePositionY === cell.tablePositionY) != null;

                    cellCallback(cell);
                }

                x += cell.width;
            });

            y += this.rowHeight;
            posY ++;
        });
    }

    public prepareVisibleFooterCells(offsetX: number, offsetY: number, cellCallback: (cell: SpeedgridFooterCell) => void): void {
        let x = 0;
        this.footerCells.forEach(cell => {
            if (cell.width + x > offsetX) {
                cell.x = x - offsetX;
                cell.y = this.gridHeight - this.footerHeight;

                cellCallback(cell);
            }

            x += cell.width;
        });
    }

    public handlePointer(event: PointerEvent, columns: SpeedgridColumn<any>[],
                         options: SpeedgridOptions, location?: SpeedgridLocation): boolean {
        if (event.type === 'mouseleave') {
            this.hoveredCells = [];

            if (this.resizingHeader) {
                this.headerResized.next(this.resizingHeader);
                this.resizingHeader = undefined;
            }

            return true;
        }

        if (event.type === 'mousedown' && location) {
            if (location.cellType === SpeedgridCellType.HEADER) {
                if (location.x <= this.headerCells[location.tablePositionX].x + 5 && location.tablePositionX > 0)
                {
                    if (columns[location.tablePositionX - 1].isResizeable !== false) {
                        this.resizingHeader = this.headerCells[location.tablePositionX - 1];
                    }
                }
                else if (location.x >= this.headerCells[location.tablePositionX].x + this.headerCells[location.tablePositionX].width - 5)
                {
                    if (columns[location.tablePositionX].isResizeable !== false) {
                        this.resizingHeader = this.headerCells[location.tablePositionX];
                    }
                }
            }
        }

        if (event.type === 'mousemove' && location) {
            if (this.resizingHeader != null) {
                this.resizingHeader.width = location.x - this.resizingHeader.x;

                this.bodyRows.forEach(row => {
                    if (this.resizingHeader) {
                        row.cells[this.resizingHeader.tablePositionX].width = this.resizingHeader.width;
                    }
                });

                if (this.footerCells[this.resizingHeader.tablePositionX] != null) {
                    this.footerCells[this.resizingHeader.tablePositionX].width = this.resizingHeader.width;
                }

                return true;
            }

            if (location.cellType === SpeedgridCellType.HEADER) {
                if (location.x <= this.headerCells[location.tablePositionX].x + 5 ||
                    location.x >= this.headerCells[location.tablePositionX].x + this.headerCells[location.tablePositionX].width - 5)
                {
                    this.changeCursor('col-resize');
                    this.hoveredCells = [];

                    return true;
                }
            }

            this.changeCursor('default');

            if (!this.lastPointerPosition ||
                this.lastPointerPosition.tablePositionX !== location.tablePositionX ||
                this.lastPointerPosition.tablePositionY !== location.tablePositionY)
            {
                this.hoveredCells = [];

                if (options.fullRowHover && location.cellType === SpeedgridCellType.BODY) {
                    for (let n = 0; n < this.headerCells.length; n ++) {
                        this.hoveredCells.push({
                            ...location,
                            tablePositionX: n
                        });
                    }
                } else {
                    this.hoveredCells.push(location);
                }

                this.lastPointerPosition = location;
                this.hoveredCellsChanged.next(this.hoveredCells);

                return true;
            }
        }

        if (event.type === 'click' && location) {
            if (this.resizingHeader) {
                this.headerResized.next(this.resizingHeader);
                this.resizingHeader = undefined;
                return true;
            }

            if (location.cellType === SpeedgridCellType.HEADER) {
                if (columns[location.tablePositionX].isOrderable !== false) {
                    if (!options.multiOrderable) {
                        this.headerCells.forEach(cell => {
                            if (cell.tablePositionX !== location.tablePositionX) {
                                cell.orderby = SpeedgridOrderBy.NONE;
                            }
                        });
                    }

                    if (this.headerCells[location.tablePositionX].orderby === SpeedgridOrderBy.NONE) {
                        this.headerCells[location.tablePositionX].orderby = SpeedgridOrderBy.ASC;
                    } else if (this.headerCells[location.tablePositionX].orderby === SpeedgridOrderBy.ASC) {
                        this.headerCells[location.tablePositionX].orderby = SpeedgridOrderBy.DESC;
                    } else if (this.headerCells[location.tablePositionX].orderby === SpeedgridOrderBy.DESC) {
                        this.headerCells[location.tablePositionX].orderby = SpeedgridOrderBy.NONE;
                    }

                    this.orderByChanged.next(this.headerCells
                        .filter(cell => cell.orderby !== SpeedgridOrderBy.NONE)
                        .map(cell => ({ property: cell.property, direction: cell.orderby })));
                    return true;
                }

            } else if (location.cellType === SpeedgridCellType.BODY) {
                if (options.multiSelect) {
                    if (this.selectedCells.find(selected =>
                        selected.tablePositionX === location.tablePositionX &&
                        selected.tablePositionY === location.tablePositionY) != null)
                    {
                        if (options.fullRowSelect) {
                            this.selectedCells = _.remove(this.selectedCells,
                                element => element.tablePositionY !== location.tablePositionY);
                        } else {
                            this.selectedCells = _.remove(this.selectedCells,
                                element => element.tablePositionY !== location.tablePositionY &&
                                element.tablePositionX !== location.tablePositionX);
                        }

                        this.selectedCellsChanged.next(this.selectedCells);
                        return true;
                    }
                } else {
                    this.selectedCells = [];
                }

                if (options.fullRowSelect) {
                    for (let n = 0; n < this.headerCells.length; n ++) {
                        this.selectedCells.push({
                            ...location,
                            tablePositionX: n
                        });
                    }
                } else {
                    this.selectedCells.push(location);
                }

                this.selectedCellsChanged.next(this.selectedCells);
            }

            return true;
        }

        return false;
    }

    public getLocationByPointerEvent(event: PointerEvent, offsetX: number, offsetY: number): SpeedgridLocation {
        let cellType = SpeedgridCellType.BODY;
        if (event.offsetY <= this.headerHeight) {
            cellType = SpeedgridCellType.HEADER;
        } else if (event.offsetY >= this.gridHeight - this.footerHeight) {
            cellType = SpeedgridCellType.FOOTER;
        }

        return {
            x: event.offsetX,
            y: event.offsetY,
            tablePositionX: this.getTablePositionXByPixel(event.offsetX + offsetX),
            tablePositionY: cellType === SpeedgridCellType.BODY ?
                this.getTablePositionYByPixel(event.offsetY + offsetY - this.headerHeight) : 0,
            cellType
        };
    }

    protected getTablePositionXByPixel(offsetX: number): number {
        let x = 0;
        for (let n = 0; n < this.headerCells.length; n ++) {
            if (this.headerCells[n].width + x > offsetX) {
                return n;
            }

            x += this.headerCells[n].width;
        }

        return this.headerCells.length - 1;
    }

    protected getTablePositionYByPixel(offsetY: number): number {
        const rowOffset = offsetY % this.rowHeight;
        return Math.ceil(offsetY / this.rowHeight) + (rowOffset ? 0 : 1 );
    }

    protected changeCursor(cursor: string): void {
        if (cursor !== this.currentCursor) {
            this.currentCursor = cursor;
            this.cursorChanged.next(cursor);
        }
    }
}
