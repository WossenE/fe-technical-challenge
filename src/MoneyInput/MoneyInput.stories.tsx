import { Meta } from '@storybook/react'
import MoneyInput, { MoneyInputProps } from './MoneyInput';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/MoneyInput',
  component: MoneyInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
}satisfies Meta<typeof MoneyInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template: React.FC<MoneyInputProps> = (args) => <MoneyInput {...args} />;
export const Default = Template.bind({});
Default.args = {
  locale: 'eu',
  value: 0,
  disabled: false,
  onChange: (value) => console.log('onChange', value),
  onBlur: (value) => console.log('onBlur', value),
};
