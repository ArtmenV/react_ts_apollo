import { setupI18n, I18n, Catalog, Catalogs } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState
} from 'react';
import { StateContext } from './stateCtx';
import { IS_DEV, locales, LocaleKey } from '../../constants';

export type LocaleContextT = {
  locale: LocaleKey;
  i18n: I18n;
  RTL: boolean;
};

export const i18n = setupI18n({ locales: locales });
export const LocaleContext = createContext<LocaleContextT>({
  locale: locales[0],
  i18n,
  RTL: false
});
export const ProvideLocalizationCtx: React.FC = ({ children }) => {
  const {
    localization: { locale }
  } = useContext(StateContext);

  const [catalogs, setCatalogs] = useState<Catalogs>({});
  const RTL = isLocaleRTL(locale);
  useEffect(
    () => {
      setHTMLDirection(RTL);
      if (!locales.includes(locale) || catalogs[locale]) {
        return;
      }
      loadCatalog(locale)
        .then(cat => setCatalogs({ ...catalogs, [locale]: cat }))
        .catch(err => console.error(`Error loading Locale: ${locale}`, err));
    },
    [locale, RTL]
  );

  const localeContextValue = useMemo<LocaleContextT>(
    () => ({
      locale,
      i18n,
      RTL
    }),
    [locale, i18n]
  );

  return (
    <I18nProvider i18n={i18n} language={locale} catalogs={catalogs}>
      <LocaleContext.Provider value={localeContextValue}>
        {children}
      </LocaleContext.Provider>
    </I18nProvider>
  );
};

const loadCatalog = async (locale: LocaleKey): Promise<Catalog> => {
  if (IS_DEV) {
    return import(/* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
    `@lingui/loader!../../locales/${locale}/messages.po`);
  } else {
    return import(/* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
    `../../locales/${locale}/messages.js`);
  }
};

const isLocaleRTL = (locale: LocaleKey) => {
  return locale === 'ar_SA';
};

const setHTMLDirection = (RTL: boolean) => {
  const htmlEl = document.querySelector('html');
  if (htmlEl) {
    const dir = RTL ? 'rtl' : 'ltr';
    htmlEl.style.direction = dir;
    htmlEl.classList.remove('--rtl', '--ltr');
    htmlEl.classList.add(`--${dir}`);
  }
};
