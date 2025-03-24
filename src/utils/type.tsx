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
  name?: string | null | undefined;
  email?: string | null | undefined;
  password?: string;
  token?: string;
}

export interface IOrder {
  _id: string;
  createdAt: string;
  ingredients: [];
  name: string;
  number: number;
  status: 'created' | 'pending' | 'done';
  updatedAt: string;
}

export type TWsConnect = {
  url: string
  token?: string
}

export enum EOrderStatus {
  created = "created",
  pending = "pending",
  done = "done"
}