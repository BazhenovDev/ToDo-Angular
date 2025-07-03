import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import {CreateComponent} from "./create/create.component";
import {ViewingComponent} from "./viewing/viewing.component";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [ViewingComponent,
  CreateComponent,
  EditComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
