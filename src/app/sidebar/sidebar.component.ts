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
  @ViewChild('rightColumn', {read: ElementRef}) rightColumn: ElementRef;
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
     const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const footerTarget = entry.target as HTMLElement;
          const rightColumnHeight = this.rightColumn.nativeElement.offsetHeight;
          const rightTopPosition = this.computeAbsolutePosition(footerTarget.offsetTop, rightColumnHeight);
          this.rightColumn.nativeElement.style.position = 'absolute';
          this.rightColumn.nativeElement.style.top = `${rightTopPosition}px`;
        } else {
          this.rightColumn.nativeElement.style.position = 'fixed';
          this.rightColumn.nativeElement.style.top = '56px';
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
      root: this.rightColumn.nativeElement,
      rootMargin: '0px',
      threshold: 1
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
