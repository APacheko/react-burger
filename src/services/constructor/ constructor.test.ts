import reducer, {
  addIngredintConstructor,
  switchIngredient,
  deleteIngredientConstructor,
  clearConstructor,
  initialState,
} from "./constructor-slice";
import { configureStore } from "@reduxjs/toolkit";

describe("constructor", () => {
  it("получаем начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("добавляем ингредиент типа bun", () => {
    const newBun = {
      _id: "Test id",
      name: "Test name",
      type: "bun",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "img",
      image_mobile: "image-mobile",
      image_large: "image-large",
      __v: 0,
    };

    expect(
      reducer(initialState, {
        type: addIngredintConstructor.type,
        payload: newBun,
      })
    ).toEqual({
      ...initialState,
      bunConstructor: newBun,
    });
  });

  it("добавляем ингредиент", () => {
    const newIngredient = {
      uuid: expect.any(String),
      _id: "Test id",
      name: "Test name",
      type: "main",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "image",
      image_mobile: "image-mobile",
      image_large: "image-large",
      __v: 0,
    };

    expect(
      reducer(initialState, {
        type: addIngredintConstructor.type,
        payload: newIngredient,
      })
    ).toEqual({
      ...initialState,
      ingredientsConstructor: [
        {
          uuid: expect.any(String),
          _id: "Test id",
          name: "Test name",
          type: "main",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "image",
          image_mobile: "image-mobile",
          image_large: "image-large",
          __v: 0,
        },
      ],
    });
  });

  it("добавляем второй ингредиент", () => {
    const newIngredient = {
      _id: "Test id",
      name: "Test name",
      type: "main",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "image",
      image_mobile: "image-mobile",
      image_large: "image-large",
      __v: 0,
    };
    const store = configureStore({ reducer: reducer });
    store.dispatch(addIngredintConstructor(newIngredient));
    expect(store.getState()).toEqual({
      ...initialState,
      ingredientsConstructor: [
        {
          uuid: expect.any(String),
          _id: "Test id",
          name: "Test name",
          type: "main",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "image",
          image_mobile: "image-mobile",
          image_large: "image-large",
          __v: 0,
        },
      ],
    });
  });

  it("удаление ингредиента", () => {
    const ingredients = [
      {
        uuid: expect.any(String),
        _id: "id",
        name: "name",
        type: "main",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "image",
        image_mobile: "image-mobile",
        image_large: "image-large",
        __v: 0,
      },
      {
        uuid: "Test uuid",
        _id: "Test id",
        name: "Test name",
        type: "main",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "image",
        image_mobile: "image-mobile",
        image_large: "image-large",
        __v: 0,
      },
    ];
    expect(
      reducer(
        { ...initialState, ingredientsConstructor: ingredients },
        {
          type: deleteIngredientConstructor.type,
          payload: "Test uuid",
        }
      )
    ).toEqual({
      ...initialState,
      ingredientsConstructor: [
        {
          uuid: expect.any(String),
          _id: "id",
          name: "name",
          type: "main",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "image",
          image_mobile: "image-mobile",
          image_large: "image-large",
          __v: 0,
        },
      ],
    });
  });
  it("изменение расположения ингредиента", () => {
    const ingredient1 = {
      uuid: expect.any(String),
      _id: "Test id1",
      name: "Test name",
      type: "main",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "image",
      image_mobile: "image-mobile",
      image_large: "image-large",
      __v: 0,
    };

    const ingredient2 = {
      uuid: expect.any(String),
      _id: "id",
      name: "name",
      type: "main",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "image",
      image_mobile: "image-mobile",
      image_large: "image-large",
      __v: 0,
    };

    const ingredient3 = {
      uuid: expect.any(String),
      _id: "Test id2",
      name: "Test name",
      type: "main",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "image",
      image_mobile: "image-mobile",
      image_large: "image-large",
      __v: 0,
    };

    expect(
      reducer(
        {
          ...initialState,
          ingredientsConstructor: [ingredient1, ingredient2, ingredient3],
        },
        {
          type: switchIngredient.type,
          payload: { hoverIndex: 2, dragIndex: 0 },
        }
      )
    ).toEqual({
      ...initialState,
      ingredientsConstructor: [ingredient2, ingredient3, ingredient1],
    });
  });
  it("сброс конструкора", () => {
    const bun = {
      _id: "id",
      name: "name",
      type: "bun",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "image",
      image_mobile: "image-mobile",
      image_large: "image-large",
      __v: 0,
    };
    const ingredient = {
      uuid: expect.any(String),
      _id: "id",
      name: "name",
      type: "main",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "image",
      image_mobile: "image-mobile",
      image_large: "image-large",
      __v: 0,
    };
    expect(
      reducer(
        {
          bunConstructor: bun,
          ingredientsConstructor: [ingredient],
        },
        {
          type: clearConstructor.type,
        }
      )
    ).toEqual(initialState);
  });
});
