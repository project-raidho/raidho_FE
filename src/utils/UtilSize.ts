import { css } from 'styled-components';

export const BUTTON_SIZES = {
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

export const INPUT_SIZES = {
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
