/* eslint-disable react/react-in-jsx-scope */
import Modal from '../components/main/Modal';
import LoginInput from '../components/main/authUser/LoginInput';
import BlockAccess from '../components/main/BlockAccess';

const stories = {
  title: 'Modal',
  component: Modal,
};

export default stories;

// Modal Login
function TemplateStory(args) {
  return (
    <Modal {...args}>
      <LoginInput login={() => { }} message="" />
    </Modal>
  );
}

const ModalLogin = TemplateStory.bind({});

ModalLogin.args = {
  open: true,
};

export { ModalLogin };
