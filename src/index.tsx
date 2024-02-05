import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import '@epam/assets/css/theme/theme_electric.css';
import './index.module.scss';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import {
  HistoryAdaptedRouter,
  useUuiServices,
  UuiContext,
} from '@epam/uui-core';
import { ErrorHandler } from '@epam/promo';
import { svc } from './services';
import { MainPage } from './pages/MainPage/MainPage';
import { HomePage } from './pages/HomePage/HomePage';
import { Layout } from './layout/Layout';
import './i18n';
import { ErrorPage } from './pages/NotFoundPage/NotFoundPage';

const history = createBrowserHistory();
const router = new HistoryAdaptedRouter(history);

const UuiEnhancedApp = () => {
  const { services } = useUuiServices({ router });
  Object.assign(svc, services);
  const [isLoggedIn] = useState(false);
  return (
    <UuiContext.Provider value={services}>
      <ErrorHandler>
        <Router history={history}>
          <Layout>
            <Switch>
              {isLoggedIn ? (
                <Route exact path="/" component={MainPage} />
              ) : (
                <Route exact path="/" component={HomePage} />
              )}
              <Route path="*" component={ErrorPage} />
            </Switch>
          </Layout>
        </Router>
      </ErrorHandler>
    </UuiContext.Provider>
  );
};

const App = () => {
  const root = createRoot(window.document.getElementById('root') as Element);
  root.render(
    <StrictMode>
      <UuiEnhancedApp />
    </StrictMode>,
  );
};

App();
