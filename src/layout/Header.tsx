import {
  BurgerButton,
  Button,
  MainMenu,
  FlexSpacer,
  FlexCell,
  Burger,
  FlexRow,
  MainMenuButton,
} from '@epam/uui';
import { AdaptiveItemProps, MainMenuLogo } from '@epam/uui-components';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';

import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Avatar } from '../components/Avatar/Avatar';
import { LanguageSelector } from '../components/LanguageSelector/LanguageSelector';

const cognitoLoginUrl = `${
  process.env.REACT_APP_LOGIN_URL
}&redirect_uri=${encodeURIComponent(
  window.location.origin + process.env.REACT_APP_REDIRECT_PAGE ?? '',
)}`;

const cognitoSignUpUrl = `${
  process.env.REACT_APP_REGISTER_URL
}&redirect_uri=${encodeURIComponent(
  window.location.origin + process.env.REACT_APP_REDIRECT_PAGE ?? '',
)}`;

export const Header = ({ mobile = false }: { mobile?: boolean }) => {
  const location = useLocation();
  const history = useHistory();

  const { t } = useTranslation();

  const { isLoggedIn } = useSelector((state: RootState) => state.identity);

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
        caption={t('global.layout.header.artObjects')}
        onClick={() => visitPage(props, '/artobjects')}
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

  const getAnonMenuItems = (): AdaptiveItemProps[] => {
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
            onClick={() => history.push('/')}
            rawProps={{ 'data-testid': `header-logo-image` }}
            logoUrl="/artograd.logo.svg"
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
            isLinkActive={location.pathname.includes('tenders')}
            cx={styles.menuPageLink}
          />
        ),
      },
      {
        id: 'artObjectsMenuItem',
        priority: 3,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            onClick={() => history.push('/artobjects')}
            caption={t('global.layout.header.artObjects')}
            isLinkActive={location.pathname === '/artobjects'}
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
        render: (p) => <LanguageSelector key={p.id} />,
      },
      {
        id: 'signin',
        priority: 5,
        render: (p) => (
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
        render: (p) => (
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

  const getLoggedInMenuItems = (): AdaptiveItemProps[] => {
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
            onClick={() => history.push('/')}
            rawProps={{ 'data-testid': `header-logo-image` }}
            logoUrl="/artograd.logo.svg"
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
            isLinkActive={location.pathname.includes('tenders')}
            cx={styles.menuPageLink}
          />
        ),
      },
      {
        id: 'artObjectsMenuItem',
        priority: 3,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            onClick={() => history.push('/artobjects')}
            caption={t('global.layout.header.artObjects')}
            isLinkActive={location.pathname === '/artobjects'}
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
        render: (p) => <LanguageSelector key={p.id} />,
      },
      {
        id: 'header-avatar',
        priority: 5,
        render: (p) => <Avatar key={p.id} />,
      },
    ];
  };

  return (
    <FlexCell>
      <MainMenu
        items={isLoggedIn ? getLoggedInMenuItems() : getAnonMenuItems()}
      />
    </FlexCell>
  );
};
