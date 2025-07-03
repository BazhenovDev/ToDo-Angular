import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './views/main/main.component';
import {LayoutComponent} from './shared/layout/layout.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";

import {DBConfig, NgxIndexedDBModule} from 'ngx-indexed-db';
import {ReactiveFormsModule} from "@angular/forms";

const dbConfig: DBConfig = {
  name: 'TodoDB',
  version: 1,
  objectStoresMeta: [{
    store: 'todos',
    storeConfig: {
      keyPath: 'id',
      autoIncrement: true
    },
    storeSchema: [
      { name: 'title', keypath: 'title', options: { unique: false } },
      { name: 'status', keypath: 'status', options: { unique: false } },
      { name: 'statusText', keypath: 'statusText', options: { unique: false } },
      { name: 'description', keypath: 'description', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LayoutComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
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
