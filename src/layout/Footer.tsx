import React from 'react';
import {
  BurgerButton,
  MainMenu,
  MainMenuButton,
  FlexSpacer,
  FlexCell,
  Burger,
} from '@epam/uui';
import { AdaptiveItemProps, MainMenuLogo } from '@epam/uui-components';

export const Footer = () => {
  const renderBurger = (props: { onClose: () => void }) => (
    <>
      <BurgerButton
        href="/"
        caption="Training Catalog"
        onClick={() => {
          props.onClose && props.onClose();
        }}
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
          <Burger key={p.id} width={300} renderBurgerContent={renderBurger} />
        ),
      },
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
            caption="© 1993—2024 EPAM Systems. All Rights Reserved."
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
        render: (p) => <MainMenuButton key={p.id} caption="Privacy policy" />,
      },
      {
        id: 'cookiesPolicy',
        priority: 3,
        render: (p) => <MainMenuButton key={p.id} caption="Cookies policy" />,
      },
    ];
  };

  return (
    <FlexCell>
      <MainMenu items={getMenuItems()} />
    </FlexCell>
  );
};