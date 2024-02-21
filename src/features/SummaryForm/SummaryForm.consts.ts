export const TITLE = 'Белки, жиры, углеводы';
export const SLICE_NAME = 'summaryForm';

export const CALORIES_FROM_FAT = 9;
export const CALORIES_FROM_CARBOHYDRATE = 4;
export const CALORIES_FROM_PROTEIN = 4;

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

export enum Nutrition {
  fat = 'жиры',
  protein = 'белки',
  carbohydrate = 'углеводы',
}

export const GOAL_OPTIONS = [
  { value: Goal.gain, label: 'Набрать вес' },
  { value: Goal.maintain, label: 'Удерживать вес' },
  { value: Goal.loss, label: 'Сбросить вес' },
];

export const NUTRITION_TOOLTIP = {
  [Nutrition.protein]: 'Рекомендуемый диапазон значений: 20-30%',
  [Nutrition.fat]: 'Рекомендуемый диапазон значений: 25-35%',
  [Nutrition.carbohydrate]: 'Рекомендуемый диапазон значений: 45-55%',
};
