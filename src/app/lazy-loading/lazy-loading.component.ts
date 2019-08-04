import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { LazyDirective} from "../lazy.directive";
import {of} from "rxjs/internal/observable/of";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-lazy-loading',
  templateUrl: './lazy-loading.component.html',
  styleUrls: ['./lazy-loading.component.scss']
})
export class LazyLoadingComponent implements OnInit {

  @ViewChild(LazyDirective) vc: LazyDirective;

  links = ['https://picsum.photos/id/1/400/600', 'https://picsum.photos/id/20/400/600', 'https://picsum.photos/id/40/400/600']

  constructor() { }

  ngOnInit() {
  }
}
