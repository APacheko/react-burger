import reducer, { initialState, postOrderThunk } from "./order-slice";

describe("order reducer", () => {
  it("получаем начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("получаем номер заказа", () => {
    const testOrder = {
      _id: "id",
      createdAt: "test",
      ingredients: [],
      name: "name",
      number: 1,
      status: "status",
      updatedAt: "string",
    };
    expect(
      reducer(initialState, {
        type: postOrderThunk.fulfilled.type,
        payload: { order: testOrder },
      })
    ).toEqual({ ...initialState, order: testOrder });
  });

  it("ожидание номера заказа", () => {
    expect(
      reducer(initialState, {
        type: postOrderThunk.pending.type,
      })
    ).toEqual({ ...initialState, loading: true, isOpenModal: true });
  });

  it("ошибка", () => {
    const errorMessage = "Failed to fetch order";
    expect(
      reducer(initialState, {
        type: postOrderThunk.rejected.type,
        error: { message: errorMessage },
      })
    ).toEqual({ ...initialState, error: errorMessage });
  });
});
