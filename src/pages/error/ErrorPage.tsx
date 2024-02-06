import { Empty } from 'components';
import { FrownOutlined } from '@ant-design/icons';

export const ErrorPage: React.FC = () => (
  <Empty
    Icon={<FrownOutlined style={{ fontSize: '32px' }} />}
    text="Увы. Страница не найдена"
  ></Empty>
);

console.log(typeof ErrorPage);
