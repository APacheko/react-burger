import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface IIngredient {
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

interface IinitialState {
  bunConstructor: IIngredient | null;
  ingredientsConstructor: IIngredient[];
}

export const initialState: IinitialState = {
  bunConstructor: null,
  ingredientsConstructor: [],
};

export const ingredientsConstructorSlice = createSlice({
  name: "ingredientsConstructor",
  initialState,
  reducers: {
    addIngredintConstructor: {
      reducer: (state, action: PayloadAction<IIngredient>) => {
        if (action.payload.type !== "bun") {
          state.ingredientsConstructor.push(action.payload);
        } else {
          state.bunConstructor = action.payload;
        }
      },
      prepare: (item) => ({ payload: { ...item, uuid: nanoid() } }),
    },

    deleteIngredientConstructor: (state, action) => {
      state.ingredientsConstructor = state.ingredientsConstructor.filter(
        (item) => item.uuid !== action.payload
      );
    },
    switchIngredient: (state, action) => {
      const updatedIngredients = [...state.ingredientsConstructor];
      const [draggedIngredient] = updatedIngredients.splice(
        action.payload.dragIndex,
        1
      );
      updatedIngredients.splice(
        action.payload.hoverIndex,
        0,
        draggedIngredient
      );
      state.ingredientsConstructor = updatedIngredients;
    },
    clearConstructor: (state) => {
      state.bunConstructor = null;
      state.ingredientsConstructor = [];
    },
  },
  selectors: {
    ingredientsConstructor: (state) => state.ingredientsConstructor,
    bunConstructor: (state) => state.bunConstructor,
  },
});

export const {
  addIngredintConstructor,
  deleteIngredientConstructor,
  switchIngredient,
  clearConstructor,
} = ingredientsConstructorSlice.actions;
export const { ingredientsConstructor, bunConstructor } =
  ingredientsConstructorSlice.selectors;
export default ingredientsConstructorSlice.reducer;
