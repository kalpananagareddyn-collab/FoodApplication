import { Injectable } from '@angular/core';
import { CartItem } from '../../shared/models/cart-item';
import { Food } from '../../shared/models/food';

@Injectable({
  providedIn:'root'
})


export class CartService{
  extraCheese:boolean = false;
hotPan:boolean = false;
stuffedCrust:boolean = false;

extraPatty:boolean = false;
cheeseBurst:boolean = false;
crispyFries:boolean = false;

extraGhee:boolean = false;
extraChutney:boolean = false;
familyPack:boolean = false;

  cartItems:CartItem[] = [];
  addToCart(food:Food){

    let cartItem = this.cartItems.find(item =>item.food.id === food.id);
    if(cartItem){
      cartItem.quantity++;
    }

    else{
      const newItem = new CartItem();
      newItem.food = food;
      this.cartItems.push(newItem);

    }

  }

  getCartItems(){
    return this.cartItems;
  }
  clearCart(){

  this.cartItems = [];

}
getTotalPrice(){

  let total = 0;

  this.cartItems.forEach(item => {

    total +=
    item.food.price * item.quantity;

  });

  return total;

}

  getQuantity(foodId:number){
  const item = this.cartItems.find(item =>item.food.id === foodId);
  return item ? item.quantity : 0;
}

increaseQuantity(foodId:number){
  const item =  this.cartItems.find(item =>item.food.id === foodId);
  if(item){
    item.quantity++;
  }

}

decreaseQuantity(foodId:number){
  const item = this.cartItems.find(item =>item.food.id === foodId);
  if(item){
    if(item.quantity > 1){
      item.quantity--;
    }
    
    else{
      this.removeFromCart(foodId);
    }

  }

}
  removeFromCart(foodId:number){
  this.cartItems =
  this.cartItems.filter(item =>
    item.food.id !== foodId);

}

}