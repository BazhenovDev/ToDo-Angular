import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './views/main/main.component';
import {LayoutComponent} from './shared/layout/layout.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

import {dbConfig} from "./core/config/db-config";
import {NgxIndexedDBModule} from 'ngx-indexed-db';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LayoutComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
