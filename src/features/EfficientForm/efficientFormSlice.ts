import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { PERSONAL_CALC, SLICE_NAME } from './EfficientForm.consts';
import { TIndividualCalcData } from './IndividualCalc';

type TDuratuionHash = Record<string, { duration: number; coefficent: number }>;

type TInitialState = {
  totalCoefficent: number | null;
  personalCalcData: TIndividualCalcData[];
  totalDuration: number;
  durationHash: TDuratuionHash;
};

const initialState: TInitialState = {
  totalCoefficent: null,
  personalCalcData: PERSONAL_CALC,
  durationHash: {},
  totalDuration: 0,
};

export const EfficientFormSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    setTotalCoefficent: (state, action: PayloadAction<number>) => {
      state.totalCoefficent = action.payload;
    },
    setDuration: (state, action: PayloadAction<TDuratuionHash>) => {
      state.durationHash = { ...state.durationHash, ...action.payload };
    },
    resetTotalCoefficent: (state) => {
      state.totalCoefficent = null;
    },
    changePersonalCalcData: (state) => {
      state.personalCalcData = state.personalCalcData.map((rootItem) => ({
        ...rootItem,
        children: rootItem.children.map((item) => ({
          ...item,
          duration: state.durationHash[item.key]?.duration ?? item.duration,
          coefficentByDuration:
            state.durationHash[item.key]?.coefficent ??
            item.coefficentByDuration,
        })),
      }));
    },
    resetCalcData: (state) => {
      state.personalCalcData = PERSONAL_CALC;
    },
    calculateTotalDuration: (state) => {
      state.totalDuration = Object.values(state.durationHash).reduce(
        (curr, next) => {
          console.log({ curr, next: current(next) });
          return curr + next.duration;
        },
        0
      );
    },
    calculateTotalCoefficentFromData: (state) => {
      let test =
        Object.values(state.durationHash).reduce(
          (curr, next) => curr + next.coefficent,
          0
        ) / 24;
      state.totalCoefficent = Number(test.toFixed(2));
    },
  },
});

export const {
  setTotalCoefficent,
  resetTotalCoefficent,
  changePersonalCalcData,
  calculateTotalDuration,
  setDuration,
  calculateTotalCoefficentFromData,
} = EfficientFormSlice.actions;

export const selectTotalCoefficent = (state: RootState) =>
  state.efficientForm.totalCoefficent;

export const selectPersonalCalcData = (state: RootState) =>
  state.efficientForm.personalCalcData;
export const selectTotalDuration = (state: RootState) =>
  state.efficientForm.totalDuration;
export const selectDurationHash = (state: RootState) =>
  state.efficientForm.durationHash;

export const efficientFormReducer = EfficientFormSlice.reducer;
