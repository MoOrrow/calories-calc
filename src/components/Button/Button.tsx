import { Button as ButtonAntd } from 'antd';
import cn from 'classnames';
import React from 'react';
import { TButton } from './Button.types';
import './Button.scss'

export const Button: React.FC<TButton> = ({ className, children, ...rest }) => (
  <ButtonAntd className={cn('btn',className)} {...rest}>
    {children}
  </ButtonAntd>
);
