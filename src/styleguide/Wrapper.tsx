import React from 'react';
import { moodlenet } from '../themes';
import { ThemeProvider as StyledTheme } from 'styled-components';

const ThemeProvider = ({ children }) => {
  return <StyledTheme theme={moodlenet}>{children}</StyledTheme>;
};

export default ThemeProvider;
export { ThemeProvider };
