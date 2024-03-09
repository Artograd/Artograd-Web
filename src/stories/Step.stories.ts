import type { Meta, StoryObj } from '@storybook/react';
import EmptyIcon from '../images/empty.svg';
import { Step as StepComponent } from '../components/Step/Step';

const meta = {
  title: 'Pages/Homepage/Step',
  component: StepComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StepComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step: Story = {
  args: {
    id: 1,
    title: 'Tenders for art objects are opened',
    iconOnTop: false,
    description:
      'State officials announce open calls for street art tenders, inviting sculptors, artists, and creators to enhance the cityscape with original art installations.',
    linkUrl: '/',
    linkText: 'DISCOVER OPEN TENDERS',
    icon: EmptyIcon,
  },
};
