import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({

  name:'starRating',

  standalone:true

})

export class StarRatingPipe
implements PipeTransform{

  transform(value:number):string{

    return `${value} ⭐ Rating`;

  }

}