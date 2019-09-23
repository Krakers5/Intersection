import { Directive, ElementRef, HostBinding, OnInit} from '@angular/core';

@Directive({
  selector: '[appLazy]'
})
export class LazyDirective implements OnInit {
  @HostBinding('attr.src') srcAttr;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.lazyLoad();
  }

  lazyLoad() {
    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.srcAttr = entry.target.getAttribute('data-src');
          self.unobserve(entry.target);
        }
      });
    });
    observer.observe(this.el.nativeElement);
  }
}
