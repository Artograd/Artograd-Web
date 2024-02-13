import * as React from 'react';
import '@epam/assets/css/theme/theme_electric.css';
import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
  useUuiServices,
  UuiContext,
  HistoryAdaptedRouter,
} from '@epam/uui-core';
import { svc } from '../../src/services';

export const withUUI = (Story, context) => {
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
        {Story(context)}
        </div>
      </Router>
      </UuiContext.Provider>
  );
};
