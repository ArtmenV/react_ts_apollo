import { actionCtx } from '../../util/redux/Actions';
import { LocaleKey } from '../../constants';

export const setLang = actionCtx<'localization.setLang', LocaleKey>(
  'localization.setLang'
);
