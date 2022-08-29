import styled, { css } from "styled-components";

const SIZES = {
  small: css`
    --button-font-size: 1rem;
    --button-padding: 5px 25px;
    --button-radius: 30px;
  `,
  medium: css`
    --button-font-size: 24px;
    --button-width: 220px;
    --button-height: 50px;
    --button-radius: 25px;
  `,
  large: css`
    --button-font-size: 1.5rem;
    --button-width: 288px;
    --button-height: 50px;
    --button-radius: 10px;
  `
};

const VARIANTS = {
  primary: css`
    --button-color: #FFFFFF;
    --button-bg-color: #7188FF;
    --button-hover-bg-color: #7188FF;
  `,
  gray: css`
    --button-color: #FFFFFF;
    --button-bg-color: #CFCFCF;
    --button-hover-bg-color: #CFCFCF;
  `,
  line: css`
    --button-color: #1E1E1E;
    --button-border-color: #7188FF;
    --button-bg-color: #FFFFFF;
    --button-hover-bg-color: #FFFFFF;
  `,
};

function Button({ disabled, size, variant, children }) {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];

  return (
    <StyledButton
      disabled={disabled}
      sizeStyle={sizeStyle}
      variantStyle={variantStyle}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  ${(p) => p.sizeStyle}
  ${(p) => p.variantStyle}

  margin: 0;
  border: none;
  cursor: pointer;
  // font-family: "Noto Sans KR", sans-serif;
  width: var(--button-width);
  height: var(--button-height);
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 12px 16px);
  border-radius: var(--button-radius, 30px);
  background: var(--button-bg-color, #7188FF);
  color: var(--button-color, #ffffff);
  border: 1px solid var(--button-border-color, #7188FF);

  &:active,
  &:hover,
  &:focus {
    // background: var(--button-hover-bg-color, #025ce2);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    // background: var(--button-bg-color, #025ce2);
  }
`;

export default Button;