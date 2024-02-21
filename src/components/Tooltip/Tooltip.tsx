import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip as TooltipAntd } from 'antd';
import { TTooltip } from './Tooltip.types';

export const QuestionTooltip: React.FC<TTooltip> = (props) => {
  return (
    <TooltipAntd {...props}>
      <QuestionCircleOutlined />
    </TooltipAntd>
  );
};

export const Tooltip = TooltipAntd;
