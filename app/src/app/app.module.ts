// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';


// import { AppComponent } from './app.component';


// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router'
import { AppLoadModule } from './shared/app-load/app-load.module';
import { HttpModule } from '@angular/http';

import { MainModule } from './pages/main/main.module';

const routes: Routes=[
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(routes),
    AppLoadModule,
    HttpModule,
    MainModule
  ],
  providers:[
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }