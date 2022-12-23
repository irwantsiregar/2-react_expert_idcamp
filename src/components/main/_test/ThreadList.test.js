/**
 * skenario testing
 *
 * - ThreadList component
 *   - should display information when a thread is unavailable
 *   - should display the threads correctly
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadList from '../ThreadList';
import '@testing-library/jest-dom';

describe('LoginInput component', () => {
  it('should display information when a thread is unavailable', async () => {
    // Arrange
    render(<ThreadList
      threads={[]}
      keyword=""
      upvoteThread={() => { }}
      downvoteThread={() => { }}
      keywordChange={() => { }}
      category=""
      categoryChange={() => { }}
      timePosted=""
      timePostedChange={() => { }}
    />);

    // Action
    await screen.getByRole('alert');
    userEvent.click(screen.getByText('Thread not available !'));

    // Assert
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByRole('alert')).toBeInTheDocument('Thread not available !');
  });
  it('should display the threads correctly', async () => {
    // Arrange
    const threads = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
        user: {
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
        user: {
          id: 'user-2',
          name: 'Sayna',
          email: 'sayna@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    ];
    render(<ThreadList
      threads={threads}
      keyword=""
      keywordChange={() => { }}
      category=""
      upvoteThread={() => { }}
      downvoteThread={() => { }}
      categoryChange={() => { }}
      timePosted=""
      timePostedChange={() => { }}
    />);

    // Action
    await screen.getByText('Ini adalah thread pertama..');
    userEvent.click(screen.getByText('Thread Pertama'));

    // Assert
    expect(screen.getByText('Thread Kedua')).toBeTruthy();
    expect(screen.getByText('Ini adalah thread kedua..')).toBeTruthy();
  });
});
