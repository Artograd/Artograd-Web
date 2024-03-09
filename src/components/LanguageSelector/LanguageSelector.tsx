import {
  FlexRow,
  DropdownMenuBody,
  DropdownMenuButton,
  MainMenuButton,
} from '@epam/uui';
import { Dropdown } from '@epam/uui-components';
import { DropdownBodyProps } from '@epam/uui-core';
import styles from './LanguageSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const languageList = [
  {
    code: 'en',
    label: 'english',
  },
  {
    code: 'ru',
    label: 'Русский',
  },
];

const storedLanguage = localStorage.getItem('i18nextLng');

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    storedLanguage ?? i18n.language ?? 'en',
  );
  const getLabel =
    languageList.filter((language) => language.code === selectedLanguage)[0] ??
    languageList[0];

  const changeLanguageHandler = (
    language: string,
    props: { onClose?: () => void },
  ) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    props.onClose;
    props.onClose?.();
  };

  return (
    <Dropdown
      key="language-selector"
      renderTarget={(props: DropdownBodyProps) => (
        <FlexRow padding="6" vPadding="12" spacing="12">
          <MainMenuButton
            caption={getLabel.code ?? 'en'}
            {...props}
            cx={styles.languageSelector}
          />
        </FlexRow>
      )}
      renderBody={(props) => (
        <DropdownMenuBody {...props}>
          {languageList.map((language) => (
            <DropdownMenuButton
              key={language.code}
              caption={language.label}
              cx={styles.languageSelectorItem}
              onClick={() => changeLanguageHandler(language.code, props)}
            />
          ))}
        </DropdownMenuBody>
      )}
      placement="bottom-end"
    />
  );
};
