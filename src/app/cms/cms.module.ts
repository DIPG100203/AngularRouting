import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CmsRoutingModule,
    TasksComponent,
    GridComponent,
    LayoutComponent
  ]
})
export class CmsModule { }
