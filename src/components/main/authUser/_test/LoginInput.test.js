/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should display an alert message when the Sign In button is clicked but the email is emptied.
 *   - should call login function when login button is clicked
 *   - should visible register page when link is clicked
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from '../LoginInput';
import RegisterInput from '../RegisterInput';
import '@testing-library/jest-dom';

describe('LoginInput component', () => {
  it('should display an alert message when the login button is clicked but the email is emptied', async () => {
    //  arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} message="email not empty" />);
    const emailInput = screen.getByPlaceholderText('example@email.com');
    await userEvent.type(emailInput, ' ');
    const passwordInput = screen.getByPlaceholderText('your password');
    await userEvent.type(passwordInput, 'sayna');
    const loginButton = screen.getByRole('button', { name: 'Sign In' });

    // action
    await userEvent.click(loginButton);

    // // assert
    expect(mockLogin).toBeCalledWith({
      email: '',
      password: 'sayna',
    });
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByRole('alert')).toHaveTextContent('email not empty');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => { }} message="" />);

    const emailInput = screen.getByPlaceholderText('example@email.com');

    // action
    await userEvent.type(emailInput, 'sayna@gmail.com');

    // // assert
    expect(emailInput).toHaveValue('sayna@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => { }} message="" />);

    const passwordInput = screen.getByPlaceholderText('your password');

    // action
    await userEvent.type(passwordInput, 'sayna');

    // // assert
    expect(passwordInput).toHaveValue('sayna');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} message="" />);
    const emailInput = screen.getByPlaceholderText('example@email.com');
    await userEvent.type(emailInput, 'sayna@gmail.com');
    const passwordInput = screen.getByPlaceholderText('your password');
    await userEvent.type(passwordInput, 'sayna');
    const loginButton = screen.getByRole('button', { name: 'Sign In' });

    // action
    await userEvent.click(loginButton);

    // // assert
    expect(mockLogin).toBeCalledWith({
      email: 'sayna@gmail.com',
      password: 'sayna',
    });
  });
});
