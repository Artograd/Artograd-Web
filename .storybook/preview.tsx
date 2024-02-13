import '@epam/assets/css/theme/theme_electric.css';
import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import type { Preview } from '@storybook/react';
import { withTranslations } from './decorators/withTranslations';
import { withUUI } from './decorators/withUUI';
import { withRedux } from './decorators/withRedux';

const preview: Preview = {
  decorators: [
    withRedux,
    withTranslations,
    withUUI
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
