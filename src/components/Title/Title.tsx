import { TitleVariant } from './Title.consts';
import { TTitle } from './Title.types';
import './Title.scss';
import cn from 'classnames';

export const Title: React.FC<TTitle> = ({
  variant,
  children,
  weight = 400,
  className,
}) => {
  const CustomTitle = TitleVariant[variant];
  return (
    <CustomTitle
      className={cn(`title title-${variant} weight-${weight}`, className)}
    >
      {children}
    </CustomTitle>
  );
};
