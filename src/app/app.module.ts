import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LazyLoadingComponent } from './lazy-loading/lazy-loading.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { LazyDirective } from './lazy.directive';
import {HttpClientModule} from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LazyLoadingComponent,
    InfiniteScrollComponent,
    LazyDirective,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
