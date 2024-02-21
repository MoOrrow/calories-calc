import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  EfficientTabs,
  PERSONAL_CALC,
  SLICE_NAME,
} from './EfficientForm.consts';
import { TIndividualCalcData } from './IndividualCalc';

type TCalcData = Record<string, { duration: number; coefficent: number }>;

type TInitialState = {
  totalCoefficent: number | null;
  personalCalcDataSource: TIndividualCalcData[];
  totalDuration: number;
  calcData: TCalcData;
  currentTabId: EfficientTabs;
};

const initialState: TInitialState = {
  totalCoefficent: process.env.NODE_ENV === 'development' ? 1.75 : null,
  personalCalcDataSource: PERSONAL_CALC,
  calcData: {},
  totalDuration: 0,
  currentTabId: EfficientTabs.default,
};

export const efficientFormSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    setCalcData: (state, action: PayloadAction<TCalcData>) => {
      state.calcData = { ...state.calcData, ...action.payload };
    },
    resetCalcData: (state) => {
      state.calcData = initialState.calcData;
    },
    resetTotalCoefficent: (state) => {
      state.totalCoefficent = null;
    },
    changepersonalCalcDataSource: (state) => {
      state.personalCalcDataSource = state.personalCalcDataSource.map(
        (rootItem) => ({
          ...rootItem,
          children: rootItem.children.map((item) => ({
            ...item,
            duration: state.calcData[item.key]?.duration ?? item.duration,
            coefficentByDuration:
              state.calcData[item.key]?.coefficent ?? item.coefficentByDuration,
          })),
        })
      );
    },
    calculateTotalDuration: (state) => {
      state.totalDuration = Object.values(state.calcData).reduce(
        (curr, next) => {
          return curr + next.duration;
        },
        0
      );
    },
    calculateTotalCoefficentFromData: (state) => {
      let temp = Object.values(state.calcData).reduce(
        (curr, next) => curr + next.coefficent,
        0
      );
      if (state.currentTabId === EfficientTabs.individual) {
        temp = Number((temp / 24).toFixed(2));
      }
      state.totalCoefficent = temp;
    },
    setCurrentTabId: (state, action: PayloadAction<EfficientTabs>) => {
      state.currentTabId = action.payload;
    },
    resetEfficientForm: () => initialState,
  },
});

export const {
  resetTotalCoefficent,
  changepersonalCalcDataSource,
  calculateTotalDuration,
  setCalcData,
  calculateTotalCoefficentFromData,
  resetCalcData,
  setCurrentTabId,
  resetEfficientForm,
} = efficientFormSlice.actions;

export const selectTotalCoefficent = (state: RootState) =>
  state.efficientForm.totalCoefficent;

export const selectpersonalCalcDataSource = (state: RootState) =>
  state.efficientForm.personalCalcDataSource;
export const selectTotalDuration = (state: RootState) =>
  state.efficientForm.totalDuration;
export const selectCalcData = (state: RootState) =>
  state.efficientForm.calcData;
export const selectCurrentTabId = (state: RootState) =>
  state.efficientForm.currentTabId;

export const efficientFormReducer = efficientFormSlice.reducer;
