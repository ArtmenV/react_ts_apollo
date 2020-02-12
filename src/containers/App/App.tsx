// import { Trans } from '@lingui/macro';
import * as React from 'react';
// import { LocaleContext } from '../../context/global/localizationCtx';
import { ThemeProvider } from '../../styleguide/Wrapper';
// import '../../styles/loader.css';
import '../../styles/social-icons.css';
import Router from './Router';

export const App: React.FC = () => {
  // const { locale } = React.useContext(LocaleContext);
  // const direction = (locale != 'ar_SA')? 'ltr' : 'rtl';
  // if (!locale) {
  //   return (
  //     <p>
  //       <Trans>
  //         Sorry, we encountered a problem loading the app in your language.
  //       </Trans>
  //     </p>
  //   );
  // }

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

export default App;
