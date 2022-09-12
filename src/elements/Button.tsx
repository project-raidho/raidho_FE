import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

const SIZES = {
  small: css`
    --button-font-size: 1.2rem;
    --button-padding: 5px 25px;
    --button-radius: 30px;
  `,
  medium: css`
    --button-font-size: 1.2rem;
    --button-width: 220px;
    --button-height: 50px;
    --button-radius: 25px;
  `,
  large: css`
    --button-font-size: 1.5rem;
    --button-width: 288px;
    --button-height: 50px;
    --button-radius: 10px;
  `,
  tag: css`
    --button-font-size: 1.2rem;
    --button-width: auto;
    --button-height: 33px;
    --button-padding: 0 52px 0 32px;
    --button-margin-right: 25px;
    --button-radius: 25px;
  `,
  square: css`
    --button-font-size: 1.5rem;
    --button-width: auto;
    --button-height: 40px;
    --button-padding: 0 16px;
    --button-radius: 0px;
  `,
};

const VARIANTS = {
  primary: css`
    --button-color: #ffffff;
    --button-bg-color: #7188ff;
    --button-hover-bg-color: #7188ff;
  `,
  gray: css`
    --button-color: #1e1e1e;
    --button-bg-color: #cfcfcf;
    --button-hover-bg-color: var(--bg-color);
    --button-border-color: var(--gray-color);
    --button-hover-text-color: var(--gray-color);
  `,
  line: css`
    --button-color: var(--title-color);
    --button-border-color: var(--main-color);
    --button-bg-color: var(--bgSub-color);
    --button-hover-bg-color: var(--main-color);
    --button-hover-text-color: #ffffff;
  `,
  lineSquare: css`
    --button-color: var(--title-color);
    --button-border-color: var(--gray-color);
    --button-bg-color: var(--bgSub-color);
    --button-hover-bg-color: var(--bgSub-color);
    --button-hover-text-color: var(--title-color);
    --button-box-shadow: none;
  `,
};

interface Props {
  size: 'small' | 'medium' | 'large' | 'tag' | 'square';
  variant: 'primary' | 'gray' | 'line' | 'lineSquare';
  children: any;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ size, variant, children, onClick }: Props) {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];

  return (
    <StyledButton sizeStyle={sizeStyle} variantStyle={variantStyle} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ sizeStyle: any; variantStyle: any }>`
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
  margin-right: var(--button-margin-right, 20px);

  &:active,
  &:hover,
  &:focus {
    background-color: var(--button-hover-bg-color, none);
    color: var(--button-hover-text-color, #ffffff);
  }
`;

export default Button;
