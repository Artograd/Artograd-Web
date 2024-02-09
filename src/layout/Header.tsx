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
import { useLocation, useHistory } from 'react-router-dom';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Avatar } from './components/Avatar/Avatar';

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

const cognitoLoginUrl = `${
  process.env.REACT_APP_LOGIN_URL
}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_REDIRECT_URL ?? '')}`;

const cognitoSignUpUrl = `${
  process.env.REACT_APP_REGISTER_URL
}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_REDIRECT_URL ?? '')}`;

export const Header = ({ mobile = false }: { mobile?: boolean }) => {
  const location = useLocation();
  const history = useHistory();

  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language ?? 'en',
  );
  const { isLoggedIn } = useSelector((state: RootState) => state.identity);
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

  const visitPage = (props: { onClose: () => void }, page: string) => {
    props.onClose;
    props.onClose();
    history.push(page);
  };

  const renderBurger = (props: { onClose: () => void }) => (
    <>
      <BurgerButton
        caption={t('global.layout.header.homepage')}
        onClick={() => visitPage(props, '/')}
      />
      <BurgerButton
        caption={t('global.layout.header.tenders')}
        onClick={() => visitPage(props, '/tenders')}
      />
      <BurgerButton
        caption={t('global.layout.header.proposals')}
        onClick={() => visitPage(props, '/proposals')}
      />
      {!isLoggedIn && (
        <BurgerButton
          caption={t('global.layout.header.signInCta')}
          href={cognitoLoginUrl}
        />
      )}
      {!isLoggedIn && (
        <BurgerButton
          caption={t('global.layout.header.signUpCta')}
          onClick={() => visitPage(props, '/register')}
        />
      )}
    </>
  );

  const renderLanguageSelector = () => {
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

  const getMenuItems = (): AdaptiveItemProps[] => {
    return [
      {
        id: 'burger',
        priority: 100,
        collapsedContainer: !mobile,
        render: (p) => (
          <Burger
            key={p.id}
            width={300}
            renderBurgerContent={renderBurger}
            rawProps={{ 'data-testid': `header-burger-menu` }}
          />
        ),
      },
      {
        id: 'logo',
        priority: 99,
        render: (p) => (
          <MainMenuLogo
            key={p.id}
            href="{window.location.origin}"
            logoUrl="artograd.logo.svg"
          />
        ),
      },
      {
        id: 'homeMenuItem',
        priority: 1,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            onClick={() => history.push('/')}
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
            onClick={() => history.push('/tenders')}
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
            onClick={() => history.push('/proposals')}
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
      { id: 'avatar', priority: 2, render: Avatar },
      {
        id: 'signin',
        priority: 5,
        render: (p) =>
          !isLoggedIn && (
            <FlexRow key={p.id} padding="6" vPadding="12" spacing="12">
              <Button
                key={p.id}
                href={cognitoLoginUrl}
                caption={t('global.layout.header.signInCta')}
                fill="none"
                color="primary"
                cx={styles.signInButton}
              />
            </FlexRow>
          ),
      },
      {
        id: 'signup',
        priority: 6,
        render: (p) =>
          !isLoggedIn && (
            <FlexRow key={p.id} padding="6" vPadding="12" spacing="12">
              <Button
                href={cognitoSignUpUrl}
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
