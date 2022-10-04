import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

interface ButtonProps {
  size: "small" | "medium" | "large" | "tag" | "square" | "squareTheme";
  variant:
    | "primary"
    | "gray"
    | "line"
    | "lineSquare"
    | "linePrimary"
    | "lineLightBlue"
    | "lineGray"
    | "lineSquare"
    | "lineBlue";
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "reset" | "submit" | undefined;
  disabled?: boolean;
  value?: string;
  className?: string;
}
const SIZES = {
  small: css`
    --button-height: 30px;
    --button-width: auto;
    --button-font-size: 1rem;
    --button-padding: 0px 30px;
    --button-radius: 20px;
    --button-mobile-padding: 0px 5px;
    --button-mobile-font-size: 0.9rem;
    --button-mobile-width: 100px;
    --button-mobile-height: 30px;
  `,
  medium: css`
    --button-font-size: 1.3rem;
    --button-width: 150px;
    --button-height: 50px;
    --button-radius: 25px;
    --button-mobile-padding: 0px 0px;
    --button-mobile-font-size: 1rem;
    --button-mobile-width: 120px;
    --button-mobile-height: 40px;
  `,
  large: css`
    --button-font-size: 1.5rem;
    --button-width: 288px;
    --button-height: 50px;
    --button-radius: 10px;
  `,
  tag: css`
    --button-font-size: 1rem;
    --button-width: auto;
    --button-height: 30px;
    --button-padding: 0 30px 0 10px;
    --button-margin-right: 25px;
    --button-radius: 25px;
    --button-mobile-padding: 0px 5px;
    --button-mobile-font-size: 0.9rem;
    --button-mobile-height: 30px;
  `,
  square: css`
    --button-font-size: 1.5rem;
    --button-width: auto;
    --button-height: 40px;
    --button-padding: 0 16px;
    --button-radius: 0px;
    --button-mobile-height: 40px;
  `,
  squareTheme: css`
    --button-font-size: 1.5rem;
    --button-width: 180px;
    --button-height: 50px;
    --button-padding: 0 16px;
    --button-radius: 15px;
    --button-mobile-height: 50px;
  `,
};

const VARIANTS = {
  primary: css`
    --button-color: #ffffff;
    --button-bg-color: #7188ff;
    --button-hover-bg-color: #7188ff;
    --button-margin-right: 15px;
  `,
  gray: css`
    --button-color: var(--title-color);
    --button-bg-color: var(--lightGray-color);
    --button-hover-bg-color: var(--lightGray-color);
    --button-border-color: none;
    --button-hover-text-color: var(--title-color);
    --button-box-shadow: var(--button-shadow);
    --button-margin-right: 15px;
  `,
  line: css`
    --button-color: var(--title-color);
    --button-border-color: var(--main-color);
    --button-bg-color: var(--bgSub-color);
    --button-hover-bg-color: var(--main-color);
    --button-hover-text-color: #ffffff;
  `,
  linePrimary: css`
    --button-color: var(--main-color);
    --button-border-color: var(--main-color);
    --button-bg-color: var(--bg-color);
    --button-hover-bg-color: var(--main-color);
    --button-hover-text-color: #ffffff;
    --button-hover-box-shadow: var(--button-shadow);
  `,
  lineLightBlue: css`
    --button-color: var(--lightBlue-color);
    --button-border-color: var(--lightBlue-color);
    --button-bg-color: var(--bg-color);
    --button-hover-bg-color: var(--lightBlue-color);
    --button-hover-text-color: #ffffff;
    --button-hover-box-shadow: var(--button-shadow);
  `,
  lineGray: css`
    --button-color: var(--gray-color);
    --button-border-color: var(--gray-color);
    --button-bg-color: var(--bg-color);
    --button-hover-bg-color: var(--gray-color);
    --button-hover-text-color: #ffffff;
    --button-hover-box-shadow: var(--button-shadow);
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

function Button({
  size = "small",
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];

  return (
    <StyledButton sizeStyle={sizeStyle} variantStyle={variantStyle} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  sizeStyle: FlattenSimpleInterpolation;
  variantStyle: FlattenSimpleInterpolation;
}>`
  ${(p) => p.sizeStyle}
  ${(p) => p.variantStyle}
 

  /* margin: 0; */
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
  /* &:focus, */
  &:active,
  &:hover {
    background-color: var(--button-hover-bg-color, none);
    color: var(--button-hover-text-color, #ffffff);
    box-shadow: var(--button-hover-box-shadow, none);
  }

  @media (max-width: 639px) {
    padding: var(--button-mobile-padding);
    font-size: var(--button-mobile-font-size);
    width: var(--button-mobile-width);
    height: var(--button-mobile-height);
  }
`;

export default Button;
