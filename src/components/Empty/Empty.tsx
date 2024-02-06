import './Empty.scss';
import { TEmpty } from './Empty.types';

export const Empty: React.FC<TEmpty> = ({ text, Icon }) => (
  <div className="empty">
    {Icon}
    <p>{text}</p>
  </div>
);
