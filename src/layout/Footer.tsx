import React from 'react';
import { MainMenu, MainMenuButton, FlexSpacer, FlexCell } from '@epam/uui';
import { AdaptiveItemProps, MainMenuLogo } from '@epam/uui-components';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  const getMenuItems = (): AdaptiveItemProps[] => {
    return [
      {
        id: 'logo',
        priority: 99,
        render: (p) => (
          <MainMenuLogo
            key={p.id}
            href={window.location.origin}
            logoUrl="/artograd.logo.svg"
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
            caption={t('global.layout.footer.privatePolicyCta')}
          />
        ),
      },
      {
        id: 'cookiesPolicy',
        priority: 3,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            caption={t('global.layout.footer.cookiePolicyCta')}
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
