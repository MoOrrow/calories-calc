import { RadioProps } from "antd";

export type TRadioButton = {
  value: string | number;
  label: string | number;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  className?: string;
} & RadioProps;
