import { createSlice, nanoid } from "@reduxjs/toolkit";

export const initialState = {
  bunConstructor: null,
  ingredientsConstructor: [],
};

export const ingredientsConstructorSlice = createSlice({
  name: "ingredientsConstructor",
  initialState,
  reducers: {
    addIngredintConstructor: {
      reducer: (state, action) => {
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
      const [draggedIngredient] = updatedIngredients.splice(action.payload.dragIndex, 1);
      updatedIngredients.splice(action.payload.hoverIndex, 0, draggedIngredient);
      state.ingredientsConstructor = updatedIngredients;
    },
    clearConstructor: (state) => {
      state.bunConstructor = null;
      state.ingredientsConstructor = [];
    }
  },
  selectors: {
    ingredientsConstructor: (state) => state.ingredientsConstructor,
    bunConstructor: (state) => state.bunConstructor,
  },
});

export const { addIngredintConstructor, deleteIngredientConstructor, switchIngredient, clearConstructor } =
  ingredientsConstructorSlice.actions;
export const { ingredientsConstructor, bunConstructor } =
  ingredientsConstructorSlice.selectors;
