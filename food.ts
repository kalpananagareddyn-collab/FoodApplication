import { Customization } from './customization';

export class Food {

  id!: number;

  name!: string;

  cookTime!: string;

  cookTimeMinutes!: number;

  favorite!: boolean;

  origins!: string[];

  stars!: number;

  rating!: number;

  imageUrl!: string;

  image!: string;

  tags!: string[];

  price!: number;

  restaurant!: string;

  cuisine!: string;

  customizations!: Customization[];

}