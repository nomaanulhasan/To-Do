import '../App.css';
import '../index.css';

import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components';

const meta = {
  title: 'Components/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderWithNav: Story = {
  args: {
    showMenu: true,
  }
};
export const HeaderWithoutNav: Story = {
  args: {
    showMenu: false,
  }
};