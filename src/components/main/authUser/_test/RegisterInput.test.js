/**
 * skenario testing
 *
 * - registerInput component
 *   - should display an alert message when the Sign Un button is clicked but the email is emptied.
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 *   - should visible register page when link is clicked
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from '../RegisterInput';
import '@testing-library/jest-dom';

describe('registerInput component', () => {
  it('should display an alert message when the register button is clicked but the email is emptied', async () => {
    //  arrange
    const mockRegister = jest.fn();
    render(<RegisterInput register={mockRegister} message="name not empty" />);
    const firstNameInput = await screen.getByPlaceholderText('John');
    await userEvent.type(firstNameInput, 'Sayna');
    const emailInput = await screen.getByPlaceholderText('example@email.com');
    await userEvent.type(emailInput, 'sayna@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('your password');
    await userEvent.type(passwordInput, ' ');
    const registerButton = await screen.getByRole('button', { name: 'Sign Up' });

    // action
    await userEvent.click(registerButton);

    // // assert
    expect(mockRegister).toBeCalledWith({
      name: 'Sayna',
      email: 'sayna@gmail.com',
      password: ' ',
    });
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByRole('alert')).toHaveTextContent('name not empty');
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => { }} message="" />);

    const firstNameInput = await screen.getByPlaceholderText('John');

    // action
    await userEvent.type(firstNameInput, 'Sayna');

    // assert
    expect(firstNameInput).toHaveValue('Sayna');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => { }} message="" />);

    const emailInput = await screen.getByPlaceholderText('example@email.com');

    // action
    await userEvent.type(emailInput, 'sayna@gmail.com');

    // // assert
    expect(emailInput).toHaveValue('sayna@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => { }} message="" />);

    const passwordInput = screen.getByPlaceholderText('your password');
    // action
    await userEvent.type(passwordInput, 'sayna');

    // // assert
    expect(passwordInput).toHaveValue('sayna');
  });

  it('should call register function when register button is clicked', async () => {
    //  arrange
    const mockRegister = jest.fn();
    render(<RegisterInput register={mockRegister} message="name not empty" />);
    const firstNameInput = await screen.getByPlaceholderText('John');
    await userEvent.type(firstNameInput, 'Sayna');
    const emailInput = await screen.getByPlaceholderText('example@email.com');
    await userEvent.type(emailInput, 'sayna@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('your password');
    await userEvent.type(passwordInput, 'sayna');
    const registerButton = await screen.getByRole('button', { name: 'Sign Up' });

    // action
    await userEvent.click(registerButton);

    // // assert
    expect(mockRegister).toBeCalledWith({
      name: 'Sayna',
      email: 'sayna@gmail.com',
      password: 'sayna',
    });
  });
});
