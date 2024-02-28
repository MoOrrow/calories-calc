import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ActivityFormFieldNames } from 'features/ActivityForm';
import {
  GOAL_PERCENT,
  Goal,
  NUTRITION_COEFFICENT,
  NUTRITION_DATA,
  NutritionName,
  SLICE_NAME,
} from './SummaryForm.consts';
import { TNutritionData, TNutritionDataFields } from './SummaryForm.types';

type TInitialState = {
  currentGoal: Goal;
  caloriesByCoefficent: number | null;
  nutritionData: TNutritionData;
  goalValue: number;
  percentSum: number;
  isLoading: boolean;
};

const initialState: TInitialState = {
  currentGoal: Goal.maintain,
  goalValue: GOAL_PERCENT[Goal.maintain],
  caloriesByCoefficent: null,
  nutritionData: NUTRITION_DATA,
  percentSum: 0,
  isLoading: false,
};

export const summaryFormSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    calculateNutritionPercents: (state) => {
      const sumPercent = Object.values(state.nutritionData).reduce(
        (curr, next) => {
          return (curr += next.percent);
        },
        0
      );
      state.percentSum = sumPercent;
    },
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

    setNutriotionData: (
      state,
      action: PayloadAction<{
        name: NutritionName;
        data: Partial<TNutritionDataFields>;
      }>
    ) => {
      const { name, data } = action.payload;
      state.nutritionData = {
        ...state.nutritionData,
        [name]: { ...state.nutritionData[name], ...data },
      };
    },
    calculateNutritionByData: (
      state,
      action: PayloadAction<{ [ActivityFormFieldNames.weight]: number | null }>
    ) => {
      if (!state.caloriesByCoefficent) {
        return;
      }
      const { weight } = action.payload;
      let prepareResult = Object.entries(state.nutritionData).reduce(
        (curr, [name, data]) => {
          const value = Math.round(
            ((state?.caloriesByCoefficent || 1) * (data?.percent || 1)) /
              100 /
              NUTRITION_COEFFICENT[name as NutritionName]
          );

          return {
            ...curr,
            [name]: {
              ...data,
              totalResult: value,
              gpk: Number((value / (weight || 1)).toFixed(2)),
            },
          };
        },
        {} as TNutritionData
      );
      state.nutritionData = prepareResult;
    },
    resetSummaryForm: () => initialState,
  },
});

export const {
  calculateCaloriesByCoefficent,
  resetSummaryForm,
  setCurrentGoal,
  setGoalValue,
  setNutriotionData,
  calculateNutritionByData,
  calculateNutritionPercents,
} = summaryFormSlice.actions;

export const selectCaloriesByCoefficent = (state: RootState) =>
  state.summaryForm.caloriesByCoefficent;
export const selectGoalValue = (state: RootState) =>
  state.summaryForm.goalValue;
export const selectCurrentGoal = (state: RootState) =>
  state.summaryForm.currentGoal;

export const selectNutritionData = (state: RootState) =>
  state.summaryForm.nutritionData;
export const selectPercentSum = (state: RootState) =>
  state.summaryForm.percentSum;

export const summaryFormReducer = summaryFormSlice.reducer;
