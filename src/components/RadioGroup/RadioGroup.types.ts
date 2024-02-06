import { RadioChangeEvent } from 'antd';
import { ReactNode } from 'react';
import { TSize } from 'utils';

export type TRadioGroup = {
  className?: string;
  onChange?: (e: RadioChangeEvent) => void;
  disabled?: boolean;
  children: ReactNode | ReactNode[];
  defaultValue: string | number;
  buttonStyle?: 'solid' | 'outline';
  size?: TSize;
};
