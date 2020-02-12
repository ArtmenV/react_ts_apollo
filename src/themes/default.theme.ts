import { MoodleThemeInterface } from './styled';

const themeLight: MoodleThemeInterface = {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: ['12px', '14px', '16px', '20px', '24px', '28px', '32px', '48px'],
  colors: {
    primary: '#f98012',
    orange: '#f98012',
    black: '#000000e0',
    darkgray: '#3C3C3C',
    gray: 'rgba(0,0,0,.4)',
    lightgray: 'rgba(0,0,0,.1)',
    lighter: '#F5F6F7'
  },
  variants: {
    inReplyTo: {
      bg: 'aliceblue'
    },
    primary: {
      bg: '#000'
    }
  },
  text: {
    suptitle: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 0,
      color: 'rgba(0,0,0,.4)',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: '700'
    },
    link: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 1,
      color: '#3C3C3C',
      letterSpacing: '.5px',
      fontWeight: '600'
    },
    text: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 1,
      color: '#3C3C3C',
      letterSpacing: '.5px',
      fontWeight: '500'
    },
    heading: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 5,
      color: '#3C3C3C',
      letterSpacing: '1px',
      fontWeight: '800'
    }
  },
  buttons: {
    primary: {
      // backgroundColor: '#f98012',
      // color: '#fff',
      fontWeight: '600',
      height: '40px',
      px: 4,
      backgroundColor: '#f98012',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    outline: {
      fontWeight: '600',
      height: '40px',
      px: 4,
      backgroundColor: 'transparent',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      color: 'darkgray',
      border: '1px solid #f98012'
    }
  },
  space: ['0px', '4px', '8px', '16px', '32px', '64px', '128px', '256px'],
  fontFamily: '"Open Sans", sans-serif'
};

export const theme = themeLight;
