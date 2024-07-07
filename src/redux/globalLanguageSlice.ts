import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalLanguage {
  globalLanguage: string;
}

const initialState: GlobalLanguage = {
  globalLanguage: "EN"
};

export const globalLanguageSlice = createSlice({
  name: "globalLanguage",
  initialState,
  reducers: {
    setGlobalLanguage: (state, action: PayloadAction<GlobalLanguage>) => {
        state.globalLanguage = action.payload.globalLanguage;
    },
  },
});

export const { setGlobalLanguage } = globalLanguageSlice.actions;
export const globalLanguageReducer = globalLanguageSlice.reducer;