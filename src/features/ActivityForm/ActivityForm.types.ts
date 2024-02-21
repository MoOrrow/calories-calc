import { Rule } from 'antd/es/form';
import {
  ActivityFormFieldNames,
  ActivityFromGender,
} from './ActivityForm.consts';
import { Status } from 'utils';

export type TInputFormFields = {
  name: ActivityFormFieldNames;
  prefixText?: string;
  placeholder?: string;
  type?: string;
  rules?: Rule[];
  defaultValue?: number;
};

export type ActivityFormValues = {
  [ActivityFormFieldNames.gender]: ActivityFromGender;
  [ActivityFormFieldNames.height]: number | null;
  [ActivityFormFieldNames.weight]: number | null;
  [ActivityFormFieldNames.age]: number | null;
};

export type ActivityFormState = {
  totalCalories: number;
  calcValues: ActivityFormValues;
  calculateStatus: Status;
};
