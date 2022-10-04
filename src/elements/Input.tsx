import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import SearchIcon from "../assets/search.svg";

interface InputProps {
  value?: string;
  size?: "medium" | "square" | "large";
  variant?: "default" | "search";
  type?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;

  placeholder?: string;
  maxLength?: number;
}

const SIZES = {
  medium: css`
    --input-font-size: 1.5rem;
    --input-width: 50%;
    --input-height: 40px;
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
    --input-height: 40px;
    --input-radius: 15px;
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
    --input-search-background: no-repeat 99% center url(${SearchIcon})
      var(--bg-color);
  `,
};

function Input({
  placeholder,
  disabled,
  size = "square",
  variant = "default",
  onChange,
  onSubmit,
  ...props
}: InputProps) {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];

  return (
    <StInput
      disabled={disabled}
      sizeStyle={sizeStyle}
      placeholder={placeholder}
      variantStyle={variantStyle}
      onChange={onChange}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          if (onSubmit === undefined) {
            return;
          }
          onSubmit(e);
        }
      }}
      {...props}
    />
  );
}

const StInput = styled.input<{
  sizeStyle: FlattenSimpleInterpolation;
  variantStyle: FlattenSimpleInterpolation;
}>`
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
