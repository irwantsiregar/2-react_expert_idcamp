/**
 * test scenario for threadsReducer
 *
 * - threadsReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the upvote like thread when given by UPVOTE_THREAD action
 *  - should return the threads with the downvote unlike thread when given by DOWNVOTE_THREAD action
 *
 */
import threadsReducer from '../reducer';

describe('threadsReducers function', () => {
  // arrange global
  const initialState = [
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

  it('should return the initial state when given by unknown action', () => {
    // arrange
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer([], action);

    // assert
    expect(nextState).toEqual([]);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: initialState.concat([
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
          },
        ]),
      },
    };

    // action
    const nextState = threadsReducer([], action);

    // asssert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: [
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
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // asssert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the upvote like thread when given by UPVOTE_THREAD action', () => {
    // arrange
    const action = {
      type: 'UPVOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    // action upvote thread
    const nextState = threadsReducer(initialState, action);

    // asssert
    expect(nextState).toEqual([
      { ...initialState[0], upVotesBy: [action.payload.userId] },
    ]);

    // action downvote thread
    const nextState2 = threadsReducer(nextState, action);

    expect(nextState2).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });

  it('should return the threads with the downvote unlike thread when given by DOWNVOTE_THREAD action', () => {
    // arrange
    const action = {
      type: 'DOWNVOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    // action downvote thread
    const nextState = threadsReducer(initialState, action);

    // asssert
    expect(nextState).toEqual([
      { ...initialState[0], downVotesBy: [action.payload.userId] },
    ]);

    // action upvote thread
    const nextState2 = threadsReducer(nextState, action);

    expect(nextState2).toEqual([
      {
        ...initialState[0],
        downVotesBy: [],
        upVotesBy: [],
      },
    ]);
  });
});
