import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { SpeedgridColumn } from '../interfaces/speedgrid-column';
import { SpeedgridFooterCell } from '../interfaces/speedgrid-footer-cell';
import { SpeedgridHeaderCell } from '../interfaces/speedgrid-header-cell';
import { SpeedgridOptions } from '../interfaces/speedgrid-options';
import { SpeedgridLocation } from '../interfaces/speedgrid-location';
import { SpeedgridCellType } from '../enums/speedgrid-cell-type';
import { SpeedgridOrderBy } from '../enums/speedgrid-orderby';

interface SpeedgridBodyRow {

    cells: SpeedgridBodyCell[];

}

export class SpeedgridLayout {

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

    public recalcLayout(columns: SpeedgridColumn<any>[], options: SpeedgridOptions, height: number): void {
        this.gridHeight = height;
        this.headerHeight = options.headerHeight;
        this.rowHeight = options.rowHeight;
        this.footerHeight = (options.hasFooter ? options.footerHeight : 0);
        this.maxVisibleRows = Math.ceil((this.gridHeight - (this.headerHeight + this.footerHeight)) / this.rowHeight) + 1;

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

    public handlePointer(location: SpeedgridLocation, event: PointerEvent, options: SpeedgridOptions): boolean {
        if (event.type === 'mousemove') {
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
                return true;
            }
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
}
