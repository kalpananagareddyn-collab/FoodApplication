import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../servicse/cart/cart';
import { CartItem } from '../shared/models/cart-item';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector:'app-cart-page',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl:'./cart-page.html',
  styleUrl:'./cart-page.css'

})

export class CartPageComponent{
  cartItems:CartItem[] = [];
  orderPlaced:boolean = false;
  constructor( private cartService: CartService, private router:Router){
    this.cartItems =this.cartService.getCartItems();

  }

  increaseQuantity(item:CartItem){

    item.quantity++;

  }

  decreaseQuantity(item:CartItem){
    if(item.quantity > 1){
      item.quantity--;

    }
    else{

      this.cartService
      .removeFromCart(item.food.id);

      this.cartItems =
      this.cartService.getCartItems();

    }

  }

  placeOrder(){
    this.orderPlaced = true;
    this.cartService.clearCart();
    this.cartItems = this.cartService.getCartItems();

  }

  goBack(){
    this.router.navigate(['/']);
  }

  getTotalPrice(){
    let total = 0;
    this.cartItems.forEach(item => {
      total += this.getItemTotal(item);
    });
    return total;

  }

getItemTotal(item:any){

  let total =
  item.food.price * item.quantity;

  item.food.customizations.forEach((custom:any) => {

    if(custom.selected){

      total += custom.price;

    }

  });

  return total;

}

}