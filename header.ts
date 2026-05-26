import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../servicse/cart/cart';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink,MatToolbarModule,
MatButtonModule,
MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone:true,
})
export class Header {
  
  constructor(private cartService:CartService){


}
get cartCount(){

  return this.cartService.getCartItems().length;

}
}
