export const TITLE = 'Подсчет базовых калорий';
export const SLICE_NAME = 'activityForm';

export enum ActivityFormFieldNames {
  gender = 'gender',
  age = 'age',
  weight = 'weight',
  height = 'height',
}

export enum ActivityFromGender {
  male = 'male',
  female = 'female',
}

export const genderByName = {
  [ActivityFromGender.female]: 'женский',
  [ActivityFromGender.male]: 'мужской',
};

/* eslint-disable */
export const validateMessages = {
  types: {
    number: 'Поле ${label} должно быть числом',
  },
  number: {
    range: 'Поле ${label} должно содержать занчение от ${min} до ${max}',
  },
  required: 'Введите значение ${label}',
};
/* eslint-enable */

export const DEBOUNCE_DELAY = 20;
