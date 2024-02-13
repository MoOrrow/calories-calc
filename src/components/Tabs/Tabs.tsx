import { Tabs as TabsAntd } from 'antd';
import { TTabs } from './Tabs.types';
import cn from 'classnames';

export const Tabs: React.FC<TTabs> = ({ className, ...rest }) => (
  <TabsAntd className={cn('tabs', className)} {...rest} />
);
