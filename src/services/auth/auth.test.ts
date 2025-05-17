import reducer, {
  initialState,
  registrationUserThunk,
  loginUserThunk,
  updateUserDataThunk,
  logoutUserThunk,
} from "./auth-slice";

describe("auth reducer", () => {
  it("получаем начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
  it("регистрация юзера", () => {
    expect(
      reducer(initialState, {
        type: registrationUserThunk.fulfilled.type,
        payload: {
          name: "name",
          email: "Email",
        },
      })
    ).toEqual({
      ...initialState,
      user: { email: "Email", name: "name" },
    });
  });

  it("ожидание данных", () => {
    expect(
      reducer(initialState, {
        type: registrationUserThunk.pending.type,
      })
    ).toEqual({ ...initialState, loading: true });
  });

  it("ошибка", () => {
    const errorMessage = "Failed to fetch order";
    expect(
      reducer(initialState, {
        type: registrationUserThunk.rejected.type,
        error: { message: errorMessage },
      })
    ).toEqual({ ...initialState, error: errorMessage });
  });

  it("логин", () => {
    expect(
      reducer(initialState, {
        type: loginUserThunk.fulfilled.type,
        payload: { email: "testEmail", name: "name" },
      })
    ).toEqual({
      ...initialState,
      user: { email: "testEmail", name: "name" },
      isAuthChecked: true,
    });
  });

  it("ожидание данных", () => {
    expect(
      reducer(initialState, {
        type: loginUserThunk.pending.type,
      })
    ).toEqual({ ...initialState, loading: true });
  });

  it("ошибка", () => {
    const errorMessage = "Failed to fetch order";
    expect(
      reducer(initialState, {
        type: loginUserThunk.rejected.type,
        error: { message: errorMessage },
      })
    ).toEqual({ ...initialState, error: errorMessage });
  });

  it("изменение данных юзера", () => {
    const existingUser = {
      email: "oldEmail",
      name: "oldName",
    };
    const stateWithUser = {
      ...initialState,
      user: existingUser,
    };
    expect(
      reducer(stateWithUser, {
        type: updateUserDataThunk.fulfilled.type,
        payload: { user: { email: "testEmail", name: "name" } },
      })
    ).toEqual({
      ...stateWithUser,
      user: { email: "testEmail", name: "name" },
    });
  });

  it("ожидание данных", () => {
    expect(
      reducer(initialState, {
        type: updateUserDataThunk.pending.type,
      })
    ).toEqual({ ...initialState, loading: true });
  });

  it("ошибка", () => {
    const errorMessage = "Failed to fetch order";
    expect(
      reducer(initialState, {
        type: updateUserDataThunk.rejected.type,
        error: { message: errorMessage },
      })
    ).toEqual({ ...initialState, error: errorMessage });
  });

  it("Логаут", () => {
    expect(
      reducer(initialState, {
        type: logoutUserThunk.fulfilled.type,
      })
    ).toEqual({
      ...initialState, user: null
    });
  });

  it("ожидание данных", () => {
    expect(
      reducer(initialState, {
        type: logoutUserThunk.pending.type,
      })
    ).toEqual({ ...initialState, loading: true });
  });

  it("ошибка", () => {
    const errorMessage = "Failed to fetch order";
    expect(
      reducer(initialState, {
        type: logoutUserThunk.rejected.type,
        error: { message: errorMessage },
      })
    ).toEqual({ ...initialState, error: errorMessage });
  });
});
