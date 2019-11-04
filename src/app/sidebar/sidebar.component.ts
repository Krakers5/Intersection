import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
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

  constructor(private http: HttpClient,
              private renderer: Renderer2) {
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
          this.setRightColumnAbsolute();
          this.rightColumn.nativeElement.style.top = `${rightTopPosition}px`;
        } else {
          this.setRightColumnFixed();
        }
      });
    });
    observer.observe(this.footer.nativeElement);
  }

  setRightColumnFixed() {
    if (this.rightColumn.nativeElement.classList.contains('sidebar-example__right--absolute')) {
      this.renderer.removeClass(this.rightColumn.nativeElement, 'sidebar-example__right--absolute');
    }
    this.renderer.addClass(this.rightColumn.nativeElement, 'sidebar-example__right--fixed');
    this.rightColumn.nativeElement.style.top = '56px';
  }

  setRightColumnAbsolute() {
    this.renderer.removeClass(this.rightColumn.nativeElement, 'sidebar-example__right--fixed');
    this.renderer.addClass(this.rightColumn.nativeElement, 'sidebar-example__right--absolute');
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
