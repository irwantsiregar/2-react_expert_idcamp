/**
 * skenario test threads thunk
 *
 * - asyncReceiveThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 * - asyncAddThread thunk
 *  - should successfully fetch data, dispatch addThread action correctly and return thread response
 *  - should throw error when data fetching failed and return error.
 * - asyncUpVoteThread thunk
 *  - should dispatch action correctly and successfully fetch data
 *  - should throw error when data fetching failed and returns dispatch action correctly
 * - asyncDownVoteThread thunk
 *  - should dispatch action correctly and successfully fetch data
 *  - should throw error when data fetching failed and returns dispatch action correctly
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  asyncReceiveThreads,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
} from '../action';

const fakeThreadsResponse = [
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
  },
];

const fakeThreadResponse = {
  id: 'thread-3',
  title: 'Thread Ketiga',
  body: 'Ini adalah thread Ketiga',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-3',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeUpVoteThreadResponse = {
  id: 'vote-1',
  userId: 'users-1',
  threadId: 'thread-1',
  voteType: 1,
};

const fakeErrorResponse = new Error('Ups, something went wrong');

const fakeGetState = () => ({
  authUser: {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  threads: fakeThreadsResponse,
});

describe('threadsReducers', () => {
  beforeEach(() => {
    // backup original implementation
    api._getAllThreads = api.getAllThreads;
    api._postThread = api.postThread;
    api._postUpVoteThread = api.postUpVoteThread;
    api._postDownVoteThread = api.postDownVoteThread;
    api._postNeutralVoteThread = api.postNeutralVoteThread;
  });

  afterEach(() => {
    // restore original implementation
    api.getAllThreads = api._getAllThreads;
    api.postThread = api._postThread;
    api.postUpVoteThread = api._postUpVoteThread;
    api.postDownVoteThread = api._postDownVoteThread;
    api.postNeutralVoteThread = api._postNeutralVoteThread;

    // delete backup
    delete api._getAllThreads;
    delete api._postThread;
    delete api._postUpVoteThread;
    delete api._postDownVoteThread;
    delete api._postNeutralVoteThread;
  });

  describe('asyncReceiveThreads thunk', () => {
    it('should dispatch action correctly when data fething success', async () => {
      // arrange
      // stub implementation
      api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

      // mock dispatch
      const dispatch = jest.fn();

      // action
      await asyncReceiveThreads()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
      // arrange
      // stub implementation
      api.getAllThreads = () => Promise.reject(fakeErrorResponse);
      // mock dispatch
      const dispatch = jest.fn();
      // mock alert
      window.alert = jest.fn();

      // action
      await asyncReceiveThreads()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });
  //
  describe('asyncAddThread thunk', () => {
    it('should successfully fetch data, dispatch addThread action correctly and return thread response', async () => {
      // arrange
      const payload = {
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
      };
      // stub implementation
      api.postThread = () => Promise.resolve(fakeThreadResponse);

      // mock dispatch
      const dispatch = jest.fn();

      // action
      const thread = await asyncAddThread(payload)(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreadResponse));
      expect(thread).toEqual(fakeThreadResponse);
    });

    it('should throw error when data fetching failed and return error.', async () => {
      // arrange
      const payload = {
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
      };
      // stub implementation
      api.postThread = () => Promise.reject(fakeErrorResponse);

      // action
      const error = await asyncAddThread(payload)(fakeErrorResponse);

      // assert
      expect(error.message).toEqual(fakeErrorResponse.message);
    });
  });

  describe('asyncUpVoteThread thunk', () => {
    it('should dispatch action correctly and successfully fetch data', async () => {
      // arrange
      const payload = 'thread-1';
      const { authUser } = fakeGetState();
      // stub implementation
      api.postUpVoteThread = () => Promise.resolve(fakeUpVoteThreadResponse);
      api.postNeutralVoteThread = () => Promise.resolve({ ...fakeUpVoteThreadResponse, voteType: 0 });

      // mock dispatch
      const dispatch = jest.fn();

      // action
      await asyncUpVoteThread(payload)(dispatch, fakeGetState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({ threadId: payload, userId: authUser.id }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should throw error when data fetching failed and returns dispatch action correctly', async () => {
      // arrange
      const payload = 'thread-1';
      const { authUser } = fakeGetState();
      // stub implementation
      api.postNeutralVoteThread = () => Promise.reject(fakeErrorResponse);

      // mock dispatch
      const dispatch = jest.fn();

      // action
      await asyncUpVoteThread(payload)(dispatch, fakeGetState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({ threadId: payload, userId: authUser.id }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncDownVoteThread thunk', () => {
    it('should dispatch action correctly and successfully fetch data', async () => {
      // arrange
      const payload = 'thread-1';
      const { authUser } = fakeGetState();
      // stub implementation
      api.postDownVoteThread = () => Promise.resolve({ ...fakeUpVoteThreadResponse, voteType: -1 });
      api.postNeutralVoteThread = () => Promise.resolve({ ...fakeUpVoteThreadResponse, voteType: 0 });

      // mock dispatch
      const dispatch = jest.fn();

      // action
      await asyncDownVoteThread(payload)(dispatch, fakeGetState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator({ threadId: payload, userId: authUser.id }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should throw error when data fetching failed and returns dispatch action correctly', async () => {
      // arrange
      const payload = 'thread-1';
      const { authUser } = fakeGetState();
      // stub implementation
      api.postNeutralVoteThread = () => Promise.reject(fakeErrorResponse);

      // mock dispatch
      const dispatch = jest.fn();

      // action
      await asyncDownVoteThread(payload)(dispatch, fakeGetState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator({ threadId: payload, userId: authUser.id }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
  // border end
});
