import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit {
  @ViewChild('more', {read: ElementRef}) more: ElementRef;
  photos = [];
  nextPhoto = 1;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.lazyLoad();
  }

  getPhoto(id): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
  }

  addPhoto(): void {
    this.getPhoto(this.nextPhoto.toString()).subscribe(r => {
      this.photos.push(r.url);
      this.nextPhoto++;
    });
  }

  lazyLoad() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.addPhoto();
        }
      });
    }, options);
    observer.observe(this.more.nativeElement);
  }

}
