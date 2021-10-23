# ngx-speedgrid

The Speedgrid is a lightning fast datagrid, made for a lot of data. Usually starting with some thousands of datarows, up to 1 million, based on browser memory. More extended readme is coming very soon, together with a doc / wiki / examples page. Better themes are coming as well.

`npm install ngx-speedgrid`

## Examples

### Most basic example

```html
    <ngx-speedgrid
        style="width: 100%; height: 500px;"
        [columns]=" columns "
        [data]=" entities "
        (clicked)=" speedgridClicked($event) "
        (selectedCellsChanged)=" selectedCellsChanged($event) "
        (orderByChanged)=" orderByChanged($event) "
    ></ngx-speedgrid>
```

```typescript
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    public columns: SpeedgridColumn<YourEntity>[] = [
        {
            width: 100,
            property: 'numberField',
            bodyCellRenderer: new SpeedgridBodyCellRendererNumber(),
            label: 'Number'
        },
        {
            width: 250,
            property: 'id',
            label: 'Guid'
        },
        {
            width: 350,
            property: 'textField',
            label: 'Text'
        },
        {
            width: 100,
            property: 'dateField',
            bodyCellRenderer: new SpeedgridBodyCellRendererString(new DatePipe('en-US')),
            label: 'Date'
        },
        {
            width: 70,
            property: 'imageField',
            bodyCellRenderer: new SpeedgridBodyCellRendererImage(this.imageStorageService, 16, 16),
            label: 'Image'
        },
        {
            width: 50,
            property: 'booleanField',
            bodyCellRenderer: new SpeedgridBodyCellRendererBoolean(),
            label: 'Bool'
        }
    ];

    public entities: SpeedgridEntity[] = [];

    constructor(private imageStorageService: SpeedgridImageStorageService) {}

    public ngOnInit(): void {
        // get your data somewhere and put it into this.entities;
    }

    public speedgridClicked(location: SpeedgridLocation): void {
        // handle click
    }

    public selectedCellsChanged(cells: Readonly<SpeedgridLocation[]>): void {
        // handle selection change
    }

    public orderByChanged(pairs: Readonly<SpeedgridOrderByPair[]>): void {
        // handle order by request
    }
```
