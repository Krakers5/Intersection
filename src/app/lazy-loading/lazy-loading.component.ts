import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-lazy-loading',
  templateUrl: './lazy-loading.component.html',
  styleUrls: ['./lazy-loading.component.scss']
})
export class LazyLoadingComponent implements OnInit {

  links = ['https://picsum.photos/id/1/400/600', 'https://picsum.photos/id/20/400/600', 'https://picsum.photos/id/40/400/600']

  constructor() { }

  ngOnInit() {
  }
}
