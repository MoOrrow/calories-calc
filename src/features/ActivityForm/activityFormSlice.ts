import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from 'utils';
import { ActivityFromGender, SLICE_NAME } from './ActivityForm.consts';
import { ActivityFormState, ActivityFormValues } from './ActivityForm.types';
import { RootState } from 'app/store';

const initialState: ActivityFormState = {
  totalCalories: 0,
  calcValues: {
    gender: ActivityFromGender.female,
    weight: null,
    height: null,
    age: null,
  },
  calculateStatus: Status.init,
};

export const activityFormSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCalcValues: (state, action: PayloadAction<ActivityFormValues>) => {
      const { payload } = action;
      state.calcValues = { ...state.calcValues, ...payload };
    },
    calculateTotalCalories: (state) => {
      const { gender, age, weight, height } = state.calcValues;
      const isEmpty = [age, weight, height].some(
        (item) => item === 0 || item === null
      );

      if (isEmpty) {
        state.totalCalories = 0;
        return;
      }

      if (weight && height && age) {
        const genderValue = gender === ActivityFromGender.female ? -161 : 5;

        state.totalCalories =
          10 * weight + 6.25 * height - 5 * age + genderValue;
      }
    },
    resetTotalCalories: (state) => {
      state.totalCalories = 0;
    },
    resetForm: () => {
      return initialState;
    },
  },
});

export const selectCalcValues = (state: RootState) =>
  state.activityForm.calcValues;
export const selectTotalCalories = (state: RootState) =>
  state.activityForm.totalCalories;

export const {
  setCalcValues,
  calculateTotalCalories,
  resetTotalCalories,
  resetForm,
} = activityFormSlice.actions;

export const activityFormReducer = activityFormSlice.reducer;
