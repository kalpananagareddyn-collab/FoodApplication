import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({

  name:'priceCategory',

  standalone:true

})

export class PriceCategoryPipe
implements PipeTransform{

transform(price:number):string{

  if(price <= 150){

    return `₹${price} 💚 Budget`;

  }

  else if(price <= 300){

    return `₹${price} 💛 Moderate`;

  }

  else{

    return `₹${price} ❤️ Premium`;

  }

}

}