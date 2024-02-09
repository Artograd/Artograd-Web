import React from 'react';
import {
  MainMenu,
  MainMenuButton,
  FlexSpacer,
  FlexCell,
  BurgerButton,
  Burger,
} from '@epam/uui';
import { AdaptiveItemProps, MainMenuLogo } from '@epam/uui-components';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';
import { useHistory } from 'react-router-dom';

export const Footer = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const visitPage = (props: { onClose: () => void }, page: string) => {
    props.onClose;
    props.onClose();
    history.push(page);
  };

  const renderBurger = (props: { onClose: () => void }) => (
    <>
      <BurgerButton
        caption={t('global.layout.footer.privatePolicyCta')}
        onClick={() => visitPage(props, '/policy')}
      />
      <BurgerButton
        caption={t('global.layout.footer.cookiePolicyCta')}
        onClick={() => visitPage(props, '/cookie')}
      />
    </>
  );

  const getMenuItems = (): AdaptiveItemProps[] => {
    return [
      {
        id: 'burger',
        priority: 100,
        collapsedContainer: true,
        render: (p) => (
          <Burger
            key={p.id}
            width={300}
            renderBurgerContent={renderBurger}
            cx={styles.footer}
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
            logoUrl="artograd.logo.svg"
          />
        ),
      },
      {
        id: 'flexSpacer1',
        priority: 100,
        render: (p) => <FlexSpacer key={p.id} />,
      },
      {
        id: 'copyrights',
        priority: 3,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            caption={t('global.layout.footer.copyright')}
          />
        ),
      },
      {
        id: 'flexSpacer2',
        priority: 100,
        render: (p) => <FlexSpacer key={p.id} />,
      },
      {
        id: 'privacyPolicy',
        priority: 3,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            onClick={() => history.push('/policy')}
            caption={t('global.layout.footer.privatePolicyCta')}
            cx={styles.footerLink}
          />
        ),
      },
      {
        id: 'cookiesPolicy',
        priority: 3,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            onClick={() => history.push('/cookie')}
            caption={t('global.layout.footer.cookiePolicyCta')}
            cx={styles.footerLink}
          />
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
