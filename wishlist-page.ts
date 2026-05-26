import { Component } from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FoodService }
from '../servicse/food/food';

@Component({

  selector:'app-wishlist-page',

  standalone:true,

  imports:[CommonModule],

  templateUrl:'./wishlist-page.html',

  styleUrl:'./wishlist-page.css'

})

export class WishlistPageComponent{

  constructor(
    private foodService:FoodService
  ){}

  get wishlistFoods(){

    return this.foodService
    .getAll()
    .filter((food:any) =>

      food.favorite

    );

  }

}