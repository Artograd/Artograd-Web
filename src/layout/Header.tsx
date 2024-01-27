import {
  BurgerButton,
  Button,
  MainMenu,
  FlexSpacer,
  FlexCell,
  Burger,
  FlexRow,
  DropdownMenuBody,
  DropdownMenuButton,
  MainMenuButton,
} from '@epam/uui';
import {
  AdaptiveItemProps,
  MainMenuLogo,
  Dropdown,
} from '@epam/uui-components';
import { DropdownBodyProps } from '@epam/uui-core';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const languageList = [
  {
    code: 'en',
    localizedCode: 'en',
    label: 'english',
  },
  {
    code: 'ru',
    localizedCode: 'ру',
    label: 'Русский',
  },
];

export const Header = () => {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const getLocalizedLabel = languageList.filter(
    (language) => language.code === selectedLanguage,
  )[0];

  const changeLanguageHandler = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  const renderBurger = (props: { onClose: () => void }) => (
    <>
      <BurgerButton
        href="/"
        caption={t('global.layout.header.homepage')}
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
      <BurgerButton
        href="/"
        caption={t('global.layout.header.tenders')}
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
      <BurgerButton
        href="/"
        caption={t('global.layout.header.proposals')}
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
      <BurgerButton
        href="/"
        caption={t('global.layout.header.signInCta')}
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
      <BurgerButton
        href="/"
        caption={t('global.layout.header.signUpCta')}
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
    </>
  );

  const renderLanguageSelector = () => {
    return (
      <Dropdown
        key="lagnuage-selector"
        renderTarget={(props: DropdownBodyProps) => (
          <FlexRow padding="6" vPadding="12" spacing="12">
            <MainMenuButton
              caption={getLocalizedLabel.localizedCode}
              {...props}
              cx={styles.languageSelector}
            />
          </FlexRow>
        )}
        renderBody={(props) => (
          <DropdownMenuBody {...props}>
            {languageList.map((language) => (
              <DropdownMenuButton
                caption={language.label}
                cx={styles.languageSelectorItem}
                onClick={() => changeLanguageHandler(language.code)}
              />
            ))}
          </DropdownMenuBody>
        )}
        placement="bottom-end"
      />
    );
  };

  const getMenuItems = (): AdaptiveItemProps[] => {
    return [
      {
        id: 'burger',
        priority: 100,
        collapsedContainer: true,
        render: (p) => (
          <Burger key={p.id} width={300} renderBurgerContent={renderBurger} />
        ),
      },
      {
        id: 'logo',
        priority: 99,
        render: (p) => (
          <MainMenuLogo key={p.id} href="/" logoUrl="/artograd.logo.svg" />
        ),
      },
      {
        id: 'homeMenuItem',
        priority: 1,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            href="/"
            caption={t('global.layout.header.homepage')}
            isLinkActive={location.pathname === '/'}
            cx={styles.menuPageLink}
          />
        ),
      },
      {
        id: 'tendersMenuItem',
        priority: 2,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            href="/tenders"
            caption={t('global.layout.header.tenders')}
            isLinkActive={location.pathname === '/tenders'}
            cx={styles.menuPageLink}
          />
        ),
      },
      {
        id: 'proposalsMenuItem',
        priority: 3,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            href="/proposals"
            caption={t('global.layout.header.proposals')}
            isLinkActive={location.pathname === '/proposals'}
            cx={styles.menuPageLink}
          />
        ),
      },
      {
        id: 'flexSpacer2',
        priority: 100,
        render: (p) => <FlexSpacer key={p.id} />,
      },
      {
        id: 'languageSelector',
        priority: 7,
        render: renderLanguageSelector,
      },
      {
        id: 'signin',
        priority: 5,
        render: (p) => (
          <FlexRow key={p.id} padding="6" vPadding="12" spacing="12">
            <Button
              key={p.id}
              href="/login"
              caption={t('global.layout.header.signInCta')}
              fill="none"
              color="primary"
              cx={styles.signInButton}
            />
          </FlexRow>
        ),
      },
      {
        id: 'sign',
        priority: 6,
        render: (p) => (
          <FlexRow key={p.id} padding="6" vPadding="12" spacing="12">
            <Button
              href="/register"
              color="primary"
              caption={t('global.layout.header.signUpCta')}
              cx={styles.signUpButton}
            />
          </FlexRow>
        ),
      },
    ];
  };

  return (
    <FlexCell>
      <MainMenu items={getMenuItems()} />
    </FlexCell>
  );
};
