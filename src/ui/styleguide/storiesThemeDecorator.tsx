import React from 'react';
import { MoodleThemeInterface } from 'ui/themes/styled';
import ThemeProvider from './Wrapper';

export const themeDeco = (theme?: MoodleThemeInterface) => storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);
