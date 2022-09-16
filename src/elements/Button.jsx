import styled, { css } from "styled-components";

const SIZES = {
  small: css`
    --button-font-size: 1.2rem;
    --button-padding: 0px 25px;
    --button-radius: 30px;
  `,
  medium: css`
    --button-font-size: 1.5rem;
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
    --button-padding: 0 30px 0 10px;
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
  squareTheme: css`
    --button-font-size: 1.5rem;
    --button-width: 180px;
    --button-height: 50px;
    --button-padding: 0 16px;
    --button-radius: 15px;
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
  lineBlue: css`
    --button-color: var(--title-color);
    --button-bg-color: var(--bg-color);
    --button-hover-bg-color: var(--main-color);
    --button-border-color: var(--title-color);
    --button-hover-text-color: var(--title-color);
  `,
};

function Button({ size, variant, children, ...props }) {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];

  return (
    <StyledButton sizeStyle={sizeStyle} variantStyle={variantStyle} {...props}>
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
  width: var(--button-width);
  height: var(--button-height, 45px);
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
