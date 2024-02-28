import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip as TooltipAntd } from 'antd';
import cn from 'classnames';
import './Tooltip.scss';
import { TTooltip } from './Tooltip.types';

export const QuestionTooltip: React.FC<TTooltip> = ({
  className,
  ...restProps
}) => {
  return (
    <TooltipAntd {...restProps}>
      <QuestionCircleOutlined className={cn('question-tooltip', className)} />
    </TooltipAntd>
  );
};

export const Tooltip = TooltipAntd;
