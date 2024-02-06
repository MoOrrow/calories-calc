import { Radio } from 'antd';
import { TRadioButton } from './RadioButton.types';

export const RadioButton: React.FC<TRadioButton> = ({
  value,
  label,
  ...rest
}) => (
  <Radio.Button value={value} {...rest}>
    {label}
  </Radio.Button>
);
