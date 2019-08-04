import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LazyLoadingComponent} from "./lazy-loading/lazy-loading.component";
import {InfiniteScrollComponent} from "./infinite-scroll/infinite-scroll.component";
import {SidebarComponent} from './sidebar/sidebar.component';

const routes: Routes = [
  {path: 'lazy-loading', component: LazyLoadingComponent},
  {path: 'infinite-scroll', component: InfiniteScrollComponent},
  {path: 'sidebar', component: SidebarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
