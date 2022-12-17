/**
 * skenario test leaderBoards
 *
 * - asyncReceiveLeaderBoards thunk
 *  - should successfully fetch data, dispatch leaderBoards action correctly
 *  - should dispatch action correctly when data fetching failed
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import { asyncReceiveLeaderBoards, receiveLeaderBoardsActionCreator } from '../action';

describe('asyncReceiveLeaderBoards thunk', () => {
  beforeEach(() => {
    api._getLeaderBoards = api.getLeaderBoards;
  });

  afterEach(() => {
    api.getLeaderBoards = api._getLeaderBoards;

    delete api._getLeaderBoards;
  });

  it('should successfully fetch data, dispatch leaderBoards action correctly', async () => {
    // arrange
    const fakeLeaderBoards = [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
    ];

    // stub implementation
    api.getLeaderBoards = () => Promise.resolve(fakeLeaderBoards);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncReceiveLeaderBoards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderBoardsActionCreator(fakeLeaderBoards));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    const fakeErrorResponse = new Error('Ups, something went wrong');

    // stub implementation
    api.getLeaderBoards = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncReceiveLeaderBoards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
