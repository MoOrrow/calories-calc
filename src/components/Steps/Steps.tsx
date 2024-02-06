import { Steps as StepsAntd } from 'antd';
import { TSteps } from './Steps.types';

export const Steps: React.FC<TSteps> = ({ items, ...rest }) => {
  return <StepsAntd items={items} {...rest}></StepsAntd>;
};
