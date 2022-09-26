import styled, { css } from "styled-components";
import SearchIcon from "../assets/search.svg";

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

function Input({ disabled, size, variant, children, ...props }) {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];

  return (
    <StyledInput
      disabled={disabled}
      sizeStyle={sizeStyle}
      variantStyle={variantStyle}
      {...props}
    >
      {children}
    </StyledInput>
  );
}

const StyledInput = styled.input`
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
