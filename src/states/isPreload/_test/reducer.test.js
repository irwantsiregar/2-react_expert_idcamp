/**
 * test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the isPreload when given by SET_IS_PRELOAD action
 */
import isPreloadReducer from '../reducer';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the isPreloadReducer when given by SET_IS_PRELOAD action', () => {
    // arrange
    const initialState = true;
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // asssert
    expect(nextState).toEqual(action.payload.users);
  });
});
