import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoCardComponent} from "./components/todo-card/todo-card.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    TodoCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    TodoCardComponent,
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule { }
