import '@testing-library/jest-dom';
import { setupJsDom } from '@epam/uui-test-utils';
import i18n from './i18n';

setupJsDom(global);

global.beforeEach(() => {
  i18n.init();
});
