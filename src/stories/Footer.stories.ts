import type { Meta, StoryObj } from '@storybook/react';

import { Footer as FooterComponent } from '../layout/Footer';

const meta = {
  title: 'Layout/Footer',
  component: FooterComponent,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FooterComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Footer: Story = {};
