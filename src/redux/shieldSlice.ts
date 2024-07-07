import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface ShieldState {
  right: number;
  top : number;
  visible : boolean;
}

const initialState: ShieldState = {
  top: 105,
  right: 210,
  visible: true
};

export const shieldSlice = createSlice({
  name: "shield",
  initialState,
  reducers: {
    setShieldState: (state, action: PayloadAction<ShieldState>) => {
      state.top = action.payload.top;
      state.right = action.payload.right;
      state.visible = action.payload.visible;
    },
  },
});

export const { setShieldState } = shieldSlice.actions;
export const shieldReducer = shieldSlice.reducer;
