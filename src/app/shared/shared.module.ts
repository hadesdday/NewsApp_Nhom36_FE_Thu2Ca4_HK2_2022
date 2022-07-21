import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeModule } from '../pages/home/home.module';
import { SearchModalComponent } from './search-modal/search-modal.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SearchComponent, SearchModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HomeModule
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    SearchComponent
  ]
})
export class SharedModule { }
