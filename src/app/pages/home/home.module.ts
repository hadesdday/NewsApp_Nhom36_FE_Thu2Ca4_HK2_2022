import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MdbLazyLoadingModule } from 'code/mdb-angular-ui-kit/lazy-loading';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MdbLazyLoadingModule
  ],
  exports: [],
})
export class HomeModule { }
