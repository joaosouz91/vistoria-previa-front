import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    LayoutRoutingModule,
    MessagesModule
  ]
})
export class LayoutModule { }
