import React from 'react';
import { moodlenet } from 'ui/themes';
import { ThemeProvider as StyledTheme } from 'styled-components';

const ThemeProvider = ({ children, theme = moodlenet }) => {
  return <StyledTheme theme={theme}>{children}</StyledTheme>;
};

export default ThemeProvider;
