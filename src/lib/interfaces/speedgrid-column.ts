export interface SpeedgridColumn<Entity> {

    width: number;

    property: (string & {}) | keyof Entity;

    label: string;

}
