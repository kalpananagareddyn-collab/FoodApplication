import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from '../servicse/food/food';
import { Food } from '../shared/models/food';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../servicse/cart/cart';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Restaurant } from '../shared/models/restaurant';
import { FavoriteDirective } from '../shared/directives/favorite';
import { StarRatingPipe } from '../shared/pipes/star-rating-pipe';
import { PriceCategoryPipe } from '../shared/pipes/price-category-pipe';
import { EmployeeService } from '../servicse/employee.service';
import { RecipeService } from '../servicse/recipe.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FavoriteDirective,
    StarRatingPipe,
    PriceCategoryPipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class HomeComponent implements OnInit {

  foods: Food[] = [];
  allFoods: Food[] = [];

  employees:any[] = [];
  recipes:any[] = [];

  restaurants: Restaurant[] = [

    {
      name:'Dominos',
      customizations:[
        'Extra Cheese',
        'Hot Pan Crust',
        'Stuffed Crust'
      ]
    },

    {
      name:'Burger King',
      customizations:[
        'Extra Patty',
        'Cheese Burst',
        'Crispy Fries'
      ]
    },

    {
      name:'Udupi Palace',
      customizations:[
        'Extra Ghee',
        'Extra Chutney',
        'Family Pack'
      ]
    }

  ];

  filteredRestaurants: Restaurant[] = this.restaurants;

  restaurantSearch:string = '';
  selectedRestaurant:string = '';
  showFoods:boolean = false;

  searchForm = new FormGroup({
    searchName:new FormControl('',[
      Validators.minLength(2),
      Validators.pattern('^[a-zA-Z ]*$')
    ]),
    searchCookTime:new FormControl('',[
      Validators.min(0)
    ]),
    searchRating:new FormControl('',[
      Validators.min(1),
      Validators.max(5)
    ])
  });

  constructor(
    private foodService: FoodService,
    private cartService: CartService,
    private employeeService: EmployeeService,
     private recipeService: RecipeService
  ) {

    this.allFoods = this.foodService.getAll();

    this.foods = [];

    if(this.foodService.selectedRestaurant){

      this.selectRestaurant(
        this.foodService.selectedRestaurant
      );

    }

  }

  ngOnInit(): void {

    this.getEmployeesData();
     this.getRecipesData();

  }
  getRecipesData(){

  this.recipeService.getRecipes()
  .subscribe({

    next:(response:any)=>{

      console.log(response);

      this.recipes = response.recipes;

    },

    error:(error:any)=>{

      console.log(error);

    }

  });

}

  getEmployeesData() {

    this.employeeService.getEmployees().subscribe({

      next:(response:any)=>{
        console.log(response);

        this.employees = response;
      },

      error:(error:any)=>{
        console.log(error);
      }

    });

  }

  clearSearch(){

    this.searchForm.reset();

    this.foods = this.allFoods;

  }

  searchRestaurants(){

    this.filteredRestaurants =
    this.restaurants.filter(restaurant =>

      restaurant.name.toLowerCase().includes(
        this.restaurantSearch.toLowerCase()
      )

    );

    if(this.restaurantSearch.trim() === ''){

      this.foods = [];
      this.showFoods = false;

    }

  }

  selectRestaurant(restaurant:string){

    this.selectedRestaurant = restaurant;

    this.foodService.selectedRestaurant = restaurant;

    this.foods =
    this.allFoods.filter(food =>

      food.restaurant === restaurant

    );

    this.showFoods = true;

  }

  searchFoods(){

    const searchName =
    this.searchForm.value.searchName
    ?.toLowerCase() || '';

    const searchCookTime =
    this.searchForm.value.searchCookTime || '';

    const searchRating =
    this.searchForm.value.searchRating || '';

    this.showFoods = true;

    this.foods =
    this.allFoods.filter(food =>

      (searchName === '' ||

      food.name.toLowerCase()
      .includes(searchName))

      &&

      (searchCookTime === '' ||

      parseInt(food.cookTime.split('-')[1])

      <= Number(searchCookTime))

      &&

      (searchRating === '' ||

      food.stars >= Number(searchRating))

    );

  }

  toggleFavorite(food: Food){

    food.favorite = !food.favorite;

  }

  addToCart(food:Food){

    this.cartService.addToCart(food);

  }

  getQuantity(foodId:number){

    return this.cartService.getQuantity(foodId);

  }

  increaseQuantity(foodId:number){

    this.cartService.increaseQuantity(foodId);

  }

  decreaseQuantity(foodId:number){

    this.cartService.decreaseQuantity(foodId);

  }

}