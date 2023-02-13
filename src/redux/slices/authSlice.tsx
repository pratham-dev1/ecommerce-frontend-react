import InitialState, { UpdateAuthAction } from "../../typesRedux/authTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  token: null,
  adminToken : null,
};

export const authSlice = createSlice({
  name: UpdateAuthAction,
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
    },
    removeToken: (state, action: PayloadAction<null>) => {
        state.token = action.payload;
      },
      setAdminToken: (state, action: PayloadAction<string>) => {
        state.adminToken = action.payload;
    },
    removeAdminToken: (state, action: PayloadAction<null>) => {
        state.adminToken = action.payload;
      },
  },
});

// Action creators are generated for each case reducer function
export const { setToken,removeToken,setAdminToken,removeAdminToken} = authSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default authSlice.reducer;