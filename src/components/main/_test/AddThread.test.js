/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle title typing correctly
 *   - should handle body typing correctly
 *   - should handle category typing correctly
 *   - should display an alert message when the Create Discussion button is clicked but the email is emptied.
 *   - should call addThread function when  Create Discussion button is clicked
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddThread from '../AddThread';
import '@testing-library/jest-dom';

describe('LoginInput component', () => {
  it('should display an alert message when the Create Discussion button is clicked but the email is emptied.', async () => {
    //  arrange
    const mockAddThread = jest.fn();
    render(<AddThread addThread={mockAddThread} message="title not empty" />);
    const titleInput = screen.getByPlaceholderText('React Redux');
    await userEvent.type(titleInput, ' ');
    const bodyInput = screen.getByPlaceholderText('React Ecosystem...');
    await userEvent.type(bodyInput, 'This body thread');
    const addThreadButton = screen.getByRole('button', { name: 'Create Discussion' });

    // action
    await userEvent.click(addThreadButton);

    // // assert
    expect(mockAddThread).toBeCalledWith({
      title: ' ',
      body: 'This body thread',
      category: '',
    });
    expect(screen.getByRole('alert')).toHaveTextContent('title not empty');
  });
});
