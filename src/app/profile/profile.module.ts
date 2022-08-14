import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from '../shared/shared.module';
import { PopupConfirmComponent } from './popup-confirm/popup-confirm.component';


@NgModule({
  declarations: [
    ProfileComponent,
    PopupConfirmComponent
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ReactiveFormsModule,
      FormsModule,
        SharedModule
    ]
})
export class ProfileModule { }
