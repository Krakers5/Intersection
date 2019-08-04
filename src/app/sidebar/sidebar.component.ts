import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('footer', {read: ElementRef}) footer: ElementRef;
  @ViewChild('right', {read: ElementRef}) right: ElementRef;
  @ViewChild('more', {read: ElementRef}) more: ElementRef;

  photos = [];
  nextPhoto = 1;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.lazyLoad();
    this.lazyLoadInside();
  }

  getPhoto(id): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
  }

  addPhoto(): void {
    this.getPhoto(this.nextPhoto.toString()).subscribe(r => {
      this.photos.push(r.url);
      console.log(this.photos);
      this.nextPhoto++;
    });
  }

  lazyLoad() {
    const options = {
      root: null,
      rootMargin: '150px',
      threshold: [0, 0.25, 0.5]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const footerTarget = entry.target as HTMLElement;
          const rightHeight = this.right.nativeElement.offsetHeight;
          const rightTopPosition = this.computeAbsolutePosition(footerTarget.offsetTop, rightHeight);
          this.right.nativeElement.style.position = 'absolute';
          this.right.nativeElement.style.top = `${rightTopPosition}px`;
        } else {
          this.right.nativeElement.style.position = 'fixed';
          this.right.nativeElement.style.top = '56px';
        }
      });
    });
    observer.observe(this.footer.nativeElement);
  }
  computeAbsolutePosition(top: number, height: number) {
    return top - height;
  }

  lazyLoadInside() {
    const options = {
      root: this.right.nativeElement,
      rootMargin: '0px',
      threshold: [0.01, 0.99]
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
