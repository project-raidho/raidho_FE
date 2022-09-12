import React from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { BUTTON_SIZES } from '../utils/UtilSize';
import { BUTTON_VARIANTS } from '../utils/UtilVariant';

interface Props {
  size?: 'small' | 'medium' | 'large' | 'tag' | 'square';
  variant?: 'primary' | 'gray' | 'line' | 'lineSquare';
  children?: React.ReactNode;
  onClick?: () => void | React.MouseEvent<HTMLButtonElement> | Promise<void> | boolean;
}

function Button({ size = 'small', variant = 'primary', children, onClick }: Props) {
  const sizeStyle = BUTTON_SIZES[size];
  const variantStyle = BUTTON_VARIANTS[variant];

  return (
    <StyledButton sizeStyle={sizeStyle} variantStyle={variantStyle} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  sizeStyle: FlattenSimpleInterpolation;
  variantStyle: FlattenSimpleInterpolation;
}>`
  ${({ sizeStyle }) => sizeStyle}
  ${({ variantStyle }) => variantStyle}

  margin: 0;
  border: none;
  cursor: pointer;
  width: var(--button-width);
  height: var(--button-height, 55px);
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 5px 16px);
  border-radius: var(--button-radius, 30px);
  background: var(--button-bg-color, #7188ff);
  color: var(--button-color, #ffffff);
  border: 1px solid var(--button-border-color, #7188ff);
  box-shadow: var(--button-box-shadow, 0px 4px 5px rgba(0, 0, 0, 0.1));
  margin-right: var(--button-margin-right, 0);

  &:active,
  &:hover,
  &:focus {
    background-color: var(--button-hover-bg-color, none);
    color: var(--button-hover-text-color, #ffffff);
  }
`;

export default Button;
