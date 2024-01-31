import '@epam/assets/css/theme/theme_electric.css';
import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import type { Preview } from '@storybook/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
  useUuiServices,
  UuiContext,
  HistoryAdaptedRouter,
} from '@epam/uui-core';
import { svc } from '../src/services';
import '../src/i18n';

const Decorator = ({ children }) => {
  const history = createBrowserHistory();
  const router = new HistoryAdaptedRouter(history);
  const { services } = useUuiServices({ router });
  Object.assign(svc, services);
  document.body.classList.add('uui-theme-electric');

  return (
    <UuiContext.Provider value={services}>
      <Router history={history}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          {children}
        </div>
      </Router>
    </UuiContext.Provider>
  );
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
