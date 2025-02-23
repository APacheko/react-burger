export interface IIngredientObj {
  _id: string;
  name: string;
  type: string | undefined;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
}

export interface IBurgerAccessories {
  bun: IIngredientObj[];
  sauce: IIngredientObj[];
  main: IIngredientObj[];
}

export interface IBurger {
  bun: IIngredientObj | null;
  ingredients: IIngredientObj[];
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  token: string;
}
