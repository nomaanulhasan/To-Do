import '../App.css';
import '../index.css';

import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../components';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FooterWithCopyright: Story = {
  args: {
    showCopyright: true,
  }
};
export const FooterWithoutCopyright: Story = {
  args: {
    showCopyright: false,
  }
};