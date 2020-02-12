import { Catalogs, setupI18n } from '@lingui/core';
import { Trans } from '@lingui/macro';
import { I18nProvider } from '@lingui/react';
import { Settings } from 'luxon';
import * as React from 'react';
import { ThemeProvider } from '../../styleguide/Wrapper';
import '../../styles/loader.css';
import '../../styles/social-icons.css';
import Router from './Router';
const LocalStorageLocaleKey = 'locale';

export const i18n = setupI18n();

export const locale_default =
  localStorage.getItem(LocalStorageLocaleKey) || 'en_GB';

export const LocaleContext = React.createContext({
  catalogs: {},
  locale: locale_default,
  setLocale: (locale: string) => {}
});

interface State {
  catalogs: Catalogs;
  locale: string;
  setLocale: (locale: string) => void;
}

/**
 * App container.
 *
 * Sets up app-wide state which contains which locale is in use, for example.
 *
 * It also wraps the whole application tree in various providers:
 *
 *  - ThemeProvider: used to theme all Zendesk Garden components
 *
 *  - LocaleContext.Provider: used to give children access to the
 *    application locale API in order to set the active locale
 *
 *  - I18nProvider: used to enable localisation throughout the app
 */
export default class App extends React.Component<{}, State> {
  state = {
    catalogs: {
      en_GB: require(process.env.NODE_ENV === 'development'
        ? '../../locales/en_GB/messages.po'
        : '../../locales/en_GB/messages.js'),
      en_US: require(process.env.NODE_ENV === 'development'
        ? '../../locales/en_US/messages.po'
        : '../../locales/en_US/messages.js'),
      es_ES: require(process.env.NODE_ENV === 'development'
        ? '../../locales/es_ES/messages.po'
        : '../../locales/es_ES/messages.js'),
      es_MX: require(process.env.NODE_ENV === 'development'
        ? '../../locales/es_MX/messages.po'
        : '../../locales/es_MX/messages.js'),
      fr_FR: require(process.env.NODE_ENV === 'development'
        ? '../../locales/fr_FR/messages.po'
        : '../../locales/fr_FR/messages.js'),
      eu: require(process.env.NODE_ENV === 'development'
        ? '../../locales/eu/messages.po'
        : '../../locales/eu/messages.js')
    },
    locale: locale_default,
    setLocale: this.setLocale.bind(this)
  };

  async setLocale(locale) {
    let catalogs = {};

    // if (!this.state.catalogs[locale] || locale == locale_default) {
    let catalog;

    if (process.env.NODE_ENV === 'development') {
      catalog = await import(/* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `@lingui/loader!../../locales/${locale}/messages.po`);
    } else {
      catalog = await import(/* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `../../locales/${locale}/messages.js`);
    }

    catalogs = {
      ...this.state.catalogs,
      [locale]: catalog
    };
    // }

    this.setState({
      locale,
      catalogs
    });

    const [language] = locale.split('_');

    Settings.defaultLocale = language;
    Settings.defaultZoneName = 'UTC';

    // Persist the locale to local-storage.
    localStorage.setItem(LocalStorageLocaleKey, locale);
  }

  public componentDidMount = () => {
    // This is a temp fix.
    this.setLocale(this.state.locale);
  };

  render() {
    // console.log(this.state)

    if (!this.state.catalogs[this.state.locale]) {
      return (
        <p>
          <Trans>
            Sorry, we encountered a problem loading the app in your language.
          </Trans>
        </p>
      );
    }

    return (
      <ThemeProvider>
        <LocaleContext.Provider value={this.state}>
          <I18nProvider
            i18n={i18n}
            language={this.state.locale}
            catalogs={this.state.catalogs}
          >
            {/* <AppStyles> */}
            <Router />
            {/* </AppStyles> */}
          </I18nProvider>
        </LocaleContext.Provider>
      </ThemeProvider>
    );
  }
}
