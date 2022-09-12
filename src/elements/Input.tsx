import React from 'react';
import styled, { css } from 'styled-components';
import SearchIcon from '../assets/search.svg';

const SIZES = {
  medium: css`
    --input-font-size: 1.5rem;
    --input-width: 50%;
    --input-height: 55px;
    --input-radius: 20px;
  `,
  square: css`
    --input-font-size: 1.5rem;
    --input-width: 50%;
    --input-height: 200px;
    --input-radius: 20px;
  `,
  large: css`
    --input-font-size: 1.5rem;
    --input-width: 100%;
    --input-height: 55px;
    --input-radius: 20px;
  `,
};

const VARIANTS = {
  default: css`
    --input-color: var(--text-color);
    --input-bg-color: #ffffff;
    --input-border-color: #a0a0a0;
    --input-box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
    --input-focus-border: 1px solid var(--main-color);
  `,
  search: css`
    --input-color: var(--text-color);
    --input-bg-color: #ffffff;
    --input-border-color: #a0a0a0;
    --input-search-background: no-repeat 98.5% center url(${SearchIcon}) var(--bg-color);
  `,
};

interface Props {
  value: string | undefined;
  onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  disabled: boolean;
  size: 'medium' | 'square' | 'large';
  variant: 'default' | 'search';
  // children: JSX.Element;
  // props: any;
}

function Input({ value, onFocus, onChange, disabled, size, variant }: Props) {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];

  return (
    <StyledInput
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      disabled={disabled}
      sizeStyle={sizeStyle}
      variantStyle={variantStyle}
    />
    //   {children}
    // </StyledInput>
  );
}

const StyledInput = styled.input<{ sizeStyle: any; variantStyle: any }>`
  ${(p) => p.sizeStyle}
  ${(p) => p.variantStyle}

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
