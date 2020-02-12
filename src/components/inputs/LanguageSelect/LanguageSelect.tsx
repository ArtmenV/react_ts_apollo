import * as React from 'react';
import Select from 'react-select';
import { LocaleContext } from '../../../context/global/localizationCtx';
import { ActionContext } from '../../../context/global/actionCtx';
import { setLang } from '../../../redux/localization';
import { languages, locales } from '../../../constants';

type LanguageSelectProps = {
  fullWidth?: boolean;
} & React.SelectHTMLAttributes<object>;

const options = locales.map(loc => ({
  value: loc,
  label: languages[loc]
}));

export const LanguageSelect: React.FC<LanguageSelectProps> = props => {
  const { locale } = React.useContext(LocaleContext);
  const { dispatch } = React.useContext(ActionContext);
  return (
    <Select
      options={options}
      defaultValue={options.find(_ => _.value === locale)}
      onChange={selectedKey => {
        const selection =
          !!selectedKey && 'length' in selectedKey
            ? selectedKey[0]
            : selectedKey;
        if (!selection) {
          return;
        }

        dispatch(setLang.create(selection.value));
      }}
    />
  );
};
export default LanguageSelect;
