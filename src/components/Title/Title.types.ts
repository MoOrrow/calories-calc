import { TitleVariant, TitleWeight } from './Title.consts';

export type TTitle = {
  variant: TitleVariant;
  weight?: TitleWeight;
  className?: string;
  children?: React.ReactNode | string;
};
