import { Space as SpaceAntd, SpaceProps } from 'antd';

export const Space: React.FC<SpaceProps> = ({ children, ...rest }) => (
  <SpaceAntd {...rest}>{children}</SpaceAntd>
);
