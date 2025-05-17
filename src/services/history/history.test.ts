import reducer, {
  initialState,
  wsHistoryConnecting,
  wsHistoryDisconnect,
  wsHistoryOpen,
  wsHistoryClose,
  wsHistoryMessage,
  wsHistoryError,
} from "./history-slice";

describe("actions", () => {
  it("initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
  it("wsHistoryConnecting", () => {
    const action = { type: wsHistoryConnecting.type };
    const state = reducer(initialState, action);
    expect(state.connected).toBe(true);
  });

  it("wsHistoryDisconnect", () => {
    const action = { type: wsHistoryDisconnect.type };
    const state = reducer({ ...initialState, connected: true }, action);
    expect(state.connected).toBe(false);
  });

  it("wsHistoryOpen", () => {
    const action = { type: wsHistoryOpen.type };
    const state = reducer(
      { ...initialState, connected: false, error: "Some error" },
      action
    );
    expect(state.connected).toBe(true);
    expect(state.error).toBeNull();
  });

  it("wsHistoryClose", () => {
    const action = { type: wsHistoryClose.type };
    const state = reducer({ ...initialState, connected: true }, action);
    expect(state.connected).toBe(false);
  });

  it("wsHistoryMessage", () => {
    const mockPayload = {
      orders: [{ id: 1, name: "Order 1" }],
      total: 0,
      totalToday: 0,
    };
    const action = { type: wsHistoryMessage.type, payload: mockPayload };
    const state = reducer(initialState, action);
    expect(state.orders).toEqual(mockPayload.orders);
  });

  it("wsHistoryError", () => {
    const errorMessage = "Connection error";
    const action = { type: wsHistoryError.type, payload: errorMessage };
    const state = reducer(initialState, action);
    expect(state.error).toBe(errorMessage);
  });
});
