import { NutritionName } from './SummaryForm.consts';

export type TNutritionDataFields = {
  percent: number;
  totalResult: number | null;
  gpk: number | null;
};

export type TNutritionData = Record<NutritionName, TNutritionDataFields>;
