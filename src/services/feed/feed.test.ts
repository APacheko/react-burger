import reducer, {
  initialState,
  wsConnecting,
  wsDisconnect,
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
} from "./feed-slice";

describe("feed reducer", () => {
  it("initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
  it("wsConnecting", () => {
    const action = { type: wsConnecting.type };
    const state = reducer(initialState, action);
    expect(state.connected).toBe(true);
  });

  it("wsDisconnect", () => {
    const action = { type: wsDisconnect.type };
    const state = reducer({ ...initialState, connected: true }, action);
    expect(state.connected).toBe(false);
  });

  it("wsOpen", () => {
    const action = { type: wsOpen.type };
    const state = reducer(
      { ...initialState, connected: false, error: "Some error" },
      action
    );
    expect(state.connected).toBe(true);
    expect(state.error).toBeNull();
  });

  it("wsClose", () => {
    const action = { type: wsClose.type };
    const state = reducer({ ...initialState, connected: true }, action);
    expect(state.connected).toBe(false);
  });

  it("wsMessage", () => {
    const mockPayload = {
      orders: [{ id: 1, name: "Order 1" }],
      total: 100,
      totalToday: 10,
    };
    const action = { type: wsMessage.type, payload: mockPayload };
    const state = reducer(initialState, action);
    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(mockPayload.total);
    expect(state.totalToday).toBe(mockPayload.totalToday);
  });

  it("wsError", () => {
    const errorMessage = "Connection error";
    const action = { type: wsError.type, payload: errorMessage };
    const state = reducer(initialState, action);
    expect(state.error).toBe(errorMessage);
  });
});
