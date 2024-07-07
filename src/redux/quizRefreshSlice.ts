import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface QuizRefresh {
   quizRefresh : boolean,
   currentIndex : number
}

const initialState: QuizRefresh = {
    quizRefresh : false,
    currentIndex : 0
};

export const quizRefreshSlice = createSlice({
  name: "refreshQuiz",
  initialState,
  reducers: {
    setQuizRefreshState: (state, action: PayloadAction<QuizRefresh>) => {
        state.quizRefresh = action.payload.quizRefresh;
        state.currentIndex = action.payload.currentIndex;
    },
  },
});

export const { setQuizRefreshState } = quizRefreshSlice.actions;
export const quizRefreshReducer = quizRefreshSlice.reducer;
