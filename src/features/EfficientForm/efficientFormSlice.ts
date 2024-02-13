import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './EfficientForm.consts';
import { RootState } from 'app/store';

type TInitialState = {
  totalCoefficent: number | null;
  personalCalcData: Record<string, number | string>[];
};

const initialState: TInitialState = {
  totalCoefficent: null,
  personalCalcData: [],
};

export const EfficientFormSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    setTotalCoefficent: (state, action: PayloadAction<number>) => {
      state.totalCoefficent = action.payload;
    },
    resetTotalCoefficent: (state) => {
      state.totalCoefficent = null;
    },
    setDurability: (state, action) => {
      state.personalCalcData = [...state.personalCalcData, ...action.payload];
    },
  },
});

export const { setTotalCoefficent, resetTotalCoefficent } =
  EfficientFormSlice.actions;

export const selectTotalCoefficent = (state: RootState) =>
  state.efficientForm.totalCoefficent;

export const selectPersonalCalcData = (state: RootState) =>
  state.efficientForm.personalCalcData;

export const efficientFormReducer = EfficientFormSlice.reducer;
