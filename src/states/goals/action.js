import mockAPI from '../../data/mockAPI';

const ActionType = {
  ADD_GOAL: 'ADD_GOAL',
  DELETE_GOAL: 'DELETE_GOAL',
  TOGGLE_GOAL: 'TOGGLE_GOAL',
  RECEIVE_GOALS: 'RECEIVE_GOALS',
};

function addGoalActionCreator({ id, text }) {
  return {
    type: ActionType.ADD_GOAL,
    payload: {
      id,
      text,
    },
  };
}

function deleteGoalActionCreator(id) {
  return {
    type: ActionType.DELETE_GOAL,
    payload: {
      id,
    },
  };
}

function receiveGoalsActionCreator(goals) {
  return {
    type: ActionType.RECEIVE_GOALS,
    payload: {
      goals,
    },
  };
}

function asyncReceiveGoals() {
  return async (dispatch) => {
    const goals = await mockAPI.getGoals();
    dispatch(receiveGoalsActionCreator(goals));
  };
}

function asyncAddGoal(text) {
  return async (dispatch) => {
    const { id } = await mockAPI.addGoal(text);
    dispatch(addGoalActionCreator({ id, text }));
  };
}

function asyncDeleteGoal(id) {
  return async (dispatch) => {
    await mockAPI.deleteGoal(id);
    dispatch(deleteGoalActionCreator(id));
  };
}

export {
  addGoalActionCreator,
  deleteGoalActionCreator,
  receiveGoalsActionCreator,
  asyncReceiveGoals,
  asyncAddGoal,
  asyncDeleteGoal,
  ActionType,
};
