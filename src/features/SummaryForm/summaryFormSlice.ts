import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { GOAL_PERCENT, Goal, SLICE_NAME } from './SummaryForm.consts';

export type TNutritionvalues = {
  percent: number | null;
  value: number | null;
  gpk: number | null;
};

export type TNutrition = {
  carbohydrate: TNutritionvalues;
  fat: TNutritionvalues;
  protein: TNutritionvalues;
};

type TInitialState = {
  currentGoal: Goal;
  caloriesByCoefficent: number | null;
  nutrition: TNutrition;
  goalValue: number;
};

const initialState: TInitialState = {
  currentGoal: Goal.maintain,
  goalValue: GOAL_PERCENT[Goal.maintain],
  caloriesByCoefficent: null,
  nutrition: {
    carbohydrate: { percent: 50, value: null, gpk: null },
    fat: { percent: 25, value: null, gpk: null },
    protein: { percent: 25, value: null, gpk: null },
  },
};

export const summaryFormSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    calculateCaloriesByCoefficent: (
      state,
      action: PayloadAction<{ calories: number; coefficent: number }>
    ) => {
      let formula = action.payload.calories * action.payload.coefficent;
      let modGoalValue = state.goalValue;

      if (state.currentGoal === Goal.loss) {
        modGoalValue = -state.goalValue;
      }

      if (state.currentGoal !== Goal.maintain) {
        formula = formula + formula * (modGoalValue / 100);
      }

      state.caloriesByCoefficent = formula;
    },
    setGoalValue: (state, action: PayloadAction<number>) => {
      state.goalValue = action.payload;
    },
    setCurrentGoal: (state, action: PayloadAction<Goal>) => {
      state.currentGoal = action.payload;
    },
    resetSummaryForm: () => initialState,
  },
});

export const {
  calculateCaloriesByCoefficent,
  resetSummaryForm,
  setCurrentGoal,
  setGoalValue,
} = summaryFormSlice.actions;

export const selectCaloriesByCoefficent = (state: RootState) =>
  state.summaryForm.caloriesByCoefficent;
export const selectGoalValue = (state: RootState) =>
  state.summaryForm.goalValue;
export const selectCurrentGoal = (state: RootState) =>
  state.summaryForm.currentGoal;

export const summaryFormReducer = summaryFormSlice.reducer;
