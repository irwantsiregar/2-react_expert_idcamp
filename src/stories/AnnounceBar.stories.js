/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/react-in-jsx-scope */
import AnnounceBar from '../components/main/AnnounceBar';

const stories = {
  title: 'AnnounceBar',
  component: AnnounceBar,
};

export default stories;

function TemplateStory(args) {
  return (
    <AnnounceBar {...args} tailwindcss="mb-5">
      {args.children}
    </AnnounceBar>
  );
}

const AlertSuccess = TemplateStory.bind({});

AlertSuccess.args = {
  variant: 'outlined',
  children: 'This is a success alert — check it out!',
};

export { AlertSuccess };
