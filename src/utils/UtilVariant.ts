import { css } from 'styled-components';
import SearchIcon from '../assets/search.svg';

export const BUTTON_VARIANTS = {
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

export const INPUT_VARIANTS = {
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
