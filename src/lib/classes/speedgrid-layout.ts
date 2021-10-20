import { SpeedgridBodyCell } from '../interfaces/speedgrid-body-cell';
import { SpeedgridColumn } from '../interfaces/speedgrid-column';
import { SpeedgridFooterCell } from '../interfaces/speedgrid-footer-cell';
import { SpeedgridHeaderCell } from '../interfaces/speedgrid-header-cell';
import { SpeedgridOptions } from '../interfaces/speedgrid-options';

interface SpeedgridBodyRow {

    cells: SpeedgridBodyCell[];

}

export class SpeedgridLayout {

    protected headerCells: SpeedgridHeaderCell[] = [];
    protected bodyRows: SpeedgridBodyRow[] = [];
    protected footerCells: SpeedgridFooterCell[] = [];

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
            isSelected: false
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
                cell.x = x;

                cellCallback(cell);

                x += cell.width;
            }
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
                    cell.x = x;
                    cell.y = y;
                    cell.tablePositionY = posY;

                    cellCallback(cell);

                    x += cell.width;
                }
            });

            y += this.rowHeight;
            posY ++;
        });
    }

    public prepareVisibleFooterCells(offsetX: number, offsetY: number, cellCallback: (cell: SpeedgridFooterCell) => void): void {
        let x = 0;
        this.footerCells.forEach(cell => {
            if (cell.width + x > offsetX) {
                cell.x = x;
                cell.y = this.gridHeight - this.footerHeight;

                cellCallback(cell);

                x += cell.width;
            }
        });
    }
}
