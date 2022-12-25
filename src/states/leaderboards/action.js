import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderBoardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncReceiveLeaderBoards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderBoards = await api.getLeaderBoards();
      dispatch(receiveLeaderBoardsActionCreator(leaderBoards));
    } catch (error) {
      error;
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveLeaderBoardsActionCreator,
  asyncReceiveLeaderBoards,
};
