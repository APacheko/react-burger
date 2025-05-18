import reducer, {
  initialState,
  getIngredientsThunk,
} from "./ingredients-slice";

describe("ingredients reducer", () => {
  it("получаем начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("получаем ингредиенты", () => {
    const ingredient = {
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
        type: getIngredientsThunk.fulfilled.type,
        payload: [ingredient],
      })
    ).toEqual({ ...initialState, ingredients: [ingredient] });
  });

  it("ожидание ингредиентов", () => {
    expect(
      reducer(initialState, {
        type: getIngredientsThunk.pending.type,
      })
    ).toEqual({ ...initialState, loading: true });
  });

  it("ошибка", () => {
    const errorMessage = "Failed to fetch ingredients";
    expect(
      reducer(initialState, {
        type: getIngredientsThunk.rejected.type,
        error: { message: errorMessage },
      })
    ).toEqual({ ...initialState, error: errorMessage });
  });
});

