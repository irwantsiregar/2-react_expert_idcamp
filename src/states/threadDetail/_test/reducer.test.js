/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the threadDetail when given by RECEIVE_THREAD_DETAIL action
 *  - should return the threadDetail with the upvote like thread on detail when given by UPVOTE_DETAIL_THREAD action
 *  - should return the threadDetail with the downvote unlike thread on detail when given by DOWNVOTE_DETAIL_THREAD action
 *  - should return the threadDetail with the upvote like comment on thread detail when given by UPVOTE_COMMENT_THREAD action
 *  - should return the threadDetail with the downvote unlike comment on thread detail when given by DOWNVOTE_COMMENT_THREAD action
 *
 */
import threadDetailReducer from '../reducer';

describe('threadDetailReducers function', () => {
  // arrange global
  const initialState = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    owner: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-2',
          name: 'Sayna Nandela',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };

  it('should return the initial state when given by unknown action', () => {
    // arrange
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer({}, action);

    // assert
    expect(nextState).toEqual({});
  });

  it('should return the threadDetail when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: initialState,
      },
    };

    // action
    const nextState = threadDetailReducer({}, action);

    // asssert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return the threadDetail with the upvote like thread on detail when given by UPVOTE_DETAIL_THREAD action', () => {
    // arrange
    const action = {
      type: 'UPVOTE_DETAIL_THREAD',
      payload: {
        userId: 'users-3',
      },
    };

    // action upvote thread on detail
    const nextState = threadDetailReducer(initialState, action);

    // asssert
    expect(nextState).toEqual(
      { ...initialState, upVotesBy: [action.payload.userId] },
    );

    // action neutralize thread on detail
    const nextState2 = threadDetailReducer(nextState, action);

    expect(nextState2).toEqual(
      {
        ...initialState,
        upVotesBy: [],
        downVotesBy: [],
      },
    );
  });

  it('should return the threadDetail with the upvote like thread on detail when given by DOWNVOTE_DETAIL_THREAD action', () => {
    // arrange
    const action = {
      type: 'DOWNVOTE_DETAIL_THREAD',
      payload: {
        userId: 'users-3',
      },
    };

    // action downvote thread on detail
    const nextState = threadDetailReducer(initialState, action);

    // asssert
    expect(nextState).toEqual(
      { ...initialState, downVotesBy: [action.payload.userId] },
    );

    // action neutralize thread on detail
    const nextState2 = threadDetailReducer(nextState, action);

    expect(nextState2).toEqual(
      {
        ...initialState,
        downVotesBy: [],
        upVotesBy: [],
      },
    );
  });

  it('should return the threadDetail with the upvote like comment on thread detail when given by UPVOTE_COMMENT_THREAD action', () => {
    // arrange
    const action = {
      type: 'UPVOTE_COMMENT_THREAD',
      payload: {
        userId: 'users-3',
        commentId: 'comment-1',
      },
    };

    // action upvote comment on detail thread
    const nextState = threadDetailReducer(initialState, action);

    // asssert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: initialState.comments.map((comment) => ({
          ...comment,
          upVotesBy: [action.payload.userId],
        })),
      },
    );

    // action neutralize comment on detail thread
    const nextState2 = threadDetailReducer(nextState, action);

    expect(nextState2).toEqual(
      {
        ...initialState,
        comments: initialState.comments.map((comment) => ({
          ...comment,
          upVotesBy: [],
          downVotesBy: [],
        })),
      },
    );
  });

  it('should return the threadDetailReducer with the downvote unlike comment on thread detail when given by DOWNVOTE_COMMENT_THREAD action', () => {
    // arrange
    const action = {
      type: 'DOWNVOTE_COMMENT_THREAD',
      payload: {
        userId: 'users-3',
        commentId: 'comment-1',
      },
    };

    // action downvote comment on detail thread
    const nextState = threadDetailReducer(initialState, action);

    // asssert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: initialState.comments.map((comment) => ({
          ...comment,
          downVotesBy: [action.payload.userId],
        })),
      },
    );

    // action neutralize comment on detail thread
    const nextState2 = threadDetailReducer(nextState, action);

    expect(nextState2).toEqual(
      {
        ...initialState,
        comments: initialState.comments.map((comment) => ({
          ...comment,
          downVotesBy: [],
          upVotesBy: [],
        })),
      },
    );
  });
});
