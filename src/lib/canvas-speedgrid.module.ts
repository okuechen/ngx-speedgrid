import { NgModule } from '@angular/core';
import { CanvasSpeedgridComponent } from './canvas-speedgrid.component';
import { CanvasSpeedgridChildComponent } from './canvas/canvas-speedgrid-child.component';

@NgModule({
  declarations: [
    CanvasSpeedgridComponent,
    CanvasSpeedgridChildComponent
  ],
  imports: [],
  exports: [CanvasSpeedgridComponent]
})
export class AngularSpeedgridModule { }
