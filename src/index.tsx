import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import '@epam/assets/css/theme/theme_electric.css';
import './index.module.scss';
import { StrictMode } from 'react';
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
import { HomePage } from './pages/HomePage/HomePage';
import { Layout } from './layout/Layout';
import './i18n';
import { ErrorPage } from './pages/NotFoundPage/NotFoundPage';
import { CallbackPage } from './pages/Callback/Callback';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { TendersPage } from './pages/TendersPage/TendersPage';
import { NewTenderPage } from './pages/NewTenderPage/NewTenderPage';

const history = createBrowserHistory();
const router = new HistoryAdaptedRouter(history);
const persistor = persistStore(store);

const UuiEnhancedApp = () => {
  const { services } = useUuiServices({ router });
  Object.assign(svc, services);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UuiContext.Provider value={services}>
          <ErrorHandler>
            <Router history={history}>
              <Layout>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/callback" component={CallbackPage} />
                  <Route exact path="/tenders" component={TendersPage} />
                  <Route exact path="/tenders/new" component={NewTenderPage} />
                  <Route path="*" component={ErrorPage} />
                </Switch>
              </Layout>
            </Router>
          </ErrorHandler>
        </UuiContext.Provider>
      </PersistGate>
    </Provider>
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
