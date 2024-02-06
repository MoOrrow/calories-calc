import { createSlice } from '@reduxjs/toolkit';
import { FORM_SLICE_NAME } from './IntroduceForm.consts';

export const introduceFormSlice = createSlice({
  name: FORM_SLICE_NAME,
  initialState: {},
  reducers: {},
});

export const {} = introduceFormSlice.actions;

export const introduceFormReducer = introduceFormSlice.reducer;
