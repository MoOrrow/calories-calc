import { Radio } from 'antd';
import { TRadioGroup } from './RadioGroup.types';

export const RadioGroup: React.FC<TRadioGroup> = ({
  onChange,
  defaultValue,
  children,
  ...rest
}) => (
  <Radio.Group defaultValue={defaultValue} onChange={onChange} {...rest}>
    {children}
  </Radio.Group>
);
