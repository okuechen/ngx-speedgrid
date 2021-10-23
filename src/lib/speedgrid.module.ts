import { NgModule } from '@angular/core';
import { SpeedgridComponent } from './speedgrid.component';
import { SpeedgridChildComponent } from './canvas/speedgrid-child.component';

@NgModule({
  declarations: [
    SpeedgridComponent,
    SpeedgridChildComponent
  ],
  imports: [],
  exports: [SpeedgridComponent]
})
export class SpeedgridModule { }
