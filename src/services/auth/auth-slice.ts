import {
  register,
  login,
  getUserData,
  updateUserData,
  logout,
} from "../../utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../utils/type";

export const registrationUserThunk = createAsyncThunk(
  "auth/registrationUser",
  register
);
export const loginUserThunk = createAsyncThunk("auth/loginUser", login);

export const getUserThunk = createAsyncThunk("auth/getUserData", getUserData);

export const updateUserDataThunk = createAsyncThunk(
  "auth/updateUserData",
  updateUserData
);

export const logoutUserThunk = createAsyncThunk("auth/logoutUser", logout);

export const checkUserAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { dispatch }) => {
    if (localStorage.getItem("refreshToken")) {
      getUserData()
        .then((res) => dispatch(setUser(res.user)))
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

interface IinitialState {
  user: IUser | null,
  loading: boolean,
  error: string | null;
  isAuthChecked: boolean,
}


export const initialState: IinitialState = {
  user: null,
  loading: false,
  error: null,
  isAuthChecked: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  selectors: {
    getUser: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registrationUserThunk.rejected, (state, action ) => {
        state.error = String(action.error?.message);
        state.loading = false;
      })
      .addCase(registrationUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = String(action.error?.message);
        state.loading = false;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserDataThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user.name = action.payload.user.name;
          state.user.email = action.payload.user.email;
        } else {
          console.warn('User is not initialized');
        }
        state.loading = false;
      })
      .addCase(updateUserDataThunk.rejected, (state, action) => {
        state.error = String(action.error?.message);
        state.loading = false;
      })
      .addCase(updateUserDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.error = String(action.error?.message);
        state.loading = false;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { getUser } = authSlice.selectors;
export const { setAuthChecked, setUser } = authSlice.actions;
export default authSlice.reducer;