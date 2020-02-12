import * as styledComponents from 'styled-components';

export interface MoodleThemeInterface {
  breakpoints: string[];
  fontSizes: string[];
  colors: {
    primary: string;
    orange: string;
    black: string;
    gray: string;
    lightgray: string;
    lighter: string;
    darkgray: string;
    red: string;
    green: string;
    yellow: string;
    darkYellow: string;
    blue: string;
  };
  text: {
    subhead: {
      fontFamily: string;
      fontSize: number;
      color: string;
      textTransform: string;
      letterSpacing: string;
      fontWeight: string;
    };
    suptitle: {
      fontFamily: string;
      fontSize: number;
      color: string;
      textTransform: string;
      letterSpacing: string;
      fontWeight: string;
    };
    link: {
      fontFamily: string;
      fontSize: number;
      color: string;
      letterSpacing: string;
      fontWeight: string;
    };
    text: {
      fontFamily: string;
      fontSize: number;
      color: string;
      letterSpacing: string;
      fontWeight: string;
    };
    heading: {
      fontFamily: string;
      fontSize: number;
      color: string;
      letterSpacing: string;
      fontWeight: string;
    };
  };
  variants: {
    inReplyTo: {
      bg: string;
    };
    primary: {
      bg: string;
    };
    bad: {
      bg: string;
      color: string;
    };
    good: {
      bg: string;
      color: string;
    };
    warning: {
      bg: string;
      color: string;
    };
    info: {
      bg: string;
      color: string;
    };
    avatar: {
      borderRadius: string;
    };
  };
  buttons: {
    primary: {
      fontWeight: string;
      borderRadius: string;
      height: string;
      px: number;
      fontSize: string;
      backgroundColor: string;
      cursor: string;
      textTransform: string;
      letterSpacing: string;
    };
    danger: {
      fontWeight: string;
      borderRadius: string;
      height: string;
      color: string;
      px: number;
      fontSize: string;
      backgroundColor: string;
      cursor: string;
      textTransform: string;
      letterSpacing: string;
    };

    outline: {
      fontWeight: string;
      borderRadius: string;
      height: string;
      px: number;
      fontSize: string;
      backgroundColor: string;
      cursor: string;
      color: string;
      textTransform: string;
      letterSpacing: string;
      border: string;
    };
  };
  space: string[];
  fontFamily: string;
}

export interface StyledThemeInterface {
  theme: MoodleThemeInterface;
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme
} = styledComponents;

export { css, createGlobalStyle, keyframes, ThemeProvider, withTheme };

export default styled;
