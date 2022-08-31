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
    --button-border-color: #CFCFCF;
  `,
  line: css`
    --button-color: #1E1E1E;
    --button-border-color: #7188FF;
    --button-bg-color: #FFFFFF;
    --button-hover-bg-color: #FFFFFF;
  `,
};

function Button({ size, variant, children, ...props }) {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];

  return (
    <StyledButton
      sizeStyle={sizeStyle}
      variantStyle={variantStyle}
     {...props}
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
  width: var(--button-width);
  height: var(--button-height, 40px);
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 5px 16px);
  border-radius: var(--button-radius, 30px);
  background: var(--button-bg-color, #7188FF);
  color: var(--button-color, #ffffff);
  border: 1px solid var(--button-border-color, #7188FF);
  box-shadow: var(--input-box-shadow, 0px 4px 5px rgba(0, 0, 0, 0.1));

  &:active,
  &:hover,
  &:focus {

  }
`;

export default Button;