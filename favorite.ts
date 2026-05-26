import {Directive,  ElementRef, HostListener} from '@angular/core';

@Directive({
  selector:'[appFavorite]',
  standalone:true
})

export class FavoriteDirective{

  constructor(
    private el:ElementRef
  ){}

  @HostListener('mouseenter')

  onMouseEnter(){

    this.el.nativeElement.style.transform =
    'scale(1.2)';

    this.el.nativeElement.style.transition =
    '0.3s';

  }

  @HostListener('mouseleave')

  onMouseLeave(){

    this.el.nativeElement.style.transform =
    'scale(1)';

  }

}