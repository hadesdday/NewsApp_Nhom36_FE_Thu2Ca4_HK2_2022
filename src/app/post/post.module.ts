import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SearchResultComponent } from './search-result/search-result.component';
import { MdbLazyLoadingModule } from 'code/mdb-angular-ui-kit/lazy-loading';

@NgModule({
  declarations: [SearchResultComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MdbLazyLoadingModule,
    SharedModule
  ]
})
export class PostModule { }
