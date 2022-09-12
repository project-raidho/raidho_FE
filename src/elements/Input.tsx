import React from 'react';
import styled, { css, FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components';
import { INPUT_SIZES } from '../utils/UtilSize';
import { INPUT_VARIANTS } from '../utils/UtilVariant';

interface Props {
  disabled?: boolean;
  size?: 'square' | 'medium' | 'large';
  variant?: 'default' | 'search';
  children?: React.ReactNode;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  value?: string;
  onChange?: (event: any) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

function Input({
  disabled = false,
  value = '',
  size = 'square',
  variant = 'default',
  placeholder = '',
  onChange,
  onFocus,
  onBlur,
  onKeyUp,
  onKeyPress,
  children,
}: Props) {
  const sizeStyle = INPUT_SIZES[size];
  const variantStyle = INPUT_VARIANTS[variant];

  return (
    <StyledInput
      disabled={disabled}
      sizeStyle={sizeStyle}
      variantStyle={variantStyle}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      onKeyPress={onKeyPress}
    >
      {children}
    </StyledInput>
  );
}

const StyledInput = styled.input<{
  sizeStyle: FlattenSimpleInterpolation;
  variantStyle: FlattenSimpleInterpolation;
}>`
  ${({ sizeStyle }) => sizeStyle}
  ${({ variantStyle }) => variantStyle}

  margin: 0;
  border: none;
  cursor: pointer;
  width: var(--input-width);
  height: var(--input-height);
  font-size: var(--input-font-size, 1rem);
  padding: var(--input-padding, 0 16px);
  border-radius: var(--input-radius, 20px);
  background-color: var(--input-bg-color, #ffffff);
  color: var(--input-color, #a0a0a0);
  border: 1px solid var(--input-border-color, #a0a0a0);
  box-shadow: var(--input-box-shadow, none);
  background: var(--input-search-background);

  &:focus {
    border: var(--input-focus-border, none);
    box-shadow: var(--input-box-shadow);
    outline: none;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export default Input;
