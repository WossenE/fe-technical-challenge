import MoneyInput, { MoneyInputProps } from './MoneyInput';

import { Meta, Story } from '@storybook/react';

export default {
  title: 'Components/MoneyInput',
  component: MoneyInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // argTypes: {
  //   borderColor: { control: 'color' },
  //   borderSize: { control: 'text' },
  //   inputColor: { control: 'color' },
  // },
} as Meta<MoneyInputProps>;

const Template: Story<MoneyInputProps> = (args) => <MoneyInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  locale: 'eu',
  label: 'Label',
  value: 0,
  disabled: false,
  onChange: (value) => console.log('onChange', value),
  onBlur: (value) => console.log('onBlur', value),
  // borderColor: '#000',
  // borderSize: '1px',
  // inputColor: '#000',
};
