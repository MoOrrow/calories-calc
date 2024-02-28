import { TNutritionData } from './SummaryForm.types';

export const TITLE = 'Белки, жиры, углеводы';
export const SLICE_NAME = 'summaryForm';
export const MAX_PERCENT_VALUE = 100;
export const NUTRITION_UNIT = 'г';
export const GPK_UNIT = 'г/кг';

export enum NutritionName {
  protein = 'protein',
  fat = 'fat',
  carbohydrate = 'carbohydrate',
}

export const NUTRITION_DATA: TNutritionData = {
  [NutritionName.protein]: {
    percent: 24,
    gpk: null,
    totalResult: null,
  },
  [NutritionName.fat]: {
    percent: 26,
    gpk: null,
    totalResult: null,
  },
  [NutritionName.carbohydrate]: {
    percent: 50,
    gpk: null,
    totalResult: null,
  },
};

export const COEFFICENT_FROM_FAT = 9;
export const COEFFICENT_FROM_CARBOHYDRATE = 4;
export const COEFFICENT_FROM_PROTEIN = 4;

export const NUTRITION_COEFFICENT = {
  [NutritionName.protein]: COEFFICENT_FROM_PROTEIN,
  [NutritionName.fat]: COEFFICENT_FROM_FAT,
  [NutritionName.carbohydrate]: COEFFICENT_FROM_CARBOHYDRATE,
};

export enum Goal {
  gain = 'gain',
  loss = 'loss',
  maintain = 'maintain',
}

export const GOAL_PERCENT = {
  [Goal.gain]: 10,
  [Goal.maintain]: 0,
  [Goal.loss]: 10,
};

export const NUTRITION_PREFIX = {
  [NutritionName.fat]: 'жиры',
  [NutritionName.protein]: 'белки',
  [NutritionName.carbohydrate]: 'углеводы',
};

export const NUTRITION_TOOLTIP = {
  [NutritionName.fat]: 'Рекомендуется использовать значения в диапазоне 25-35%',
  [NutritionName.protein]:
    'Рекомендуется использовать значения в диапазоне 20-30%',
  [NutritionName.carbohydrate]:
    'Рекомендуется использовать значения в диапазоне 40-55%',
};
export const GOAL_OPTIONS = [
  { value: Goal.gain, label: 'Набрать вес' },
  { value: Goal.maintain, label: 'Удерживать вес' },
  { value: Goal.loss, label: 'Сбросить вес' },
];
