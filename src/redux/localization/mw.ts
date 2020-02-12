import { Settings } from 'luxon';
import { AnyAction, Middleware, Reducer } from 'redux';
import * as Localization from '.';
import { locales, LocaleKey } from '../../constants';
import { KVStore } from '../../util/keyvaluestore/types';

const LOCALE_KEY = 'locale';

interface LocalizationSrv {
  mw: Middleware;
  reducer: Reducer<Localization.State, AnyAction>;
}
const defaultLang = locales[0];
export const createLocalizationMW = (kvstore: KVStore): LocalizationSrv => {
  const getStoredLang = (): LocaleKey | null => kvstore.get(LOCALE_KEY);
  // const delStoredLang = (): Localization.Lang | null => kvstore.del(LANG_KEY);
  const setStoredLang = (locale: LocaleKey): void =>
    kvstore.set(LOCALE_KEY, locale);
  const mw: Middleware = store => next => {
    return action => {
      if (Localization.setLang.is(action)) {
        Settings.defaultLocale = action.payload.split('_')[0];
        setStoredLang(action.payload);
      }
      next(action);
    };
  };
  const initialLocale = getStoredLang() || defaultLang;
  Settings.defaultLocale = initialLocale.split('_')[0];
  Settings.defaultZoneName = 'UTC';
  const initialState: Localization.State = {
    locale: initialLocale
  };
  const reducer = Localization.makeReducer(initialState);
  return {
    mw,
    reducer
  };
};
