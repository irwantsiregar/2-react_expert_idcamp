import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const vote = thread.upVotesBy.includes(action.payload.userId) || thread.downVotesBy.includes(action.payload.userId);
          return vote ? {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
          }
            : { ...thread, upVotesBy: thread.upVotesBy.concat([action.payload.userId]) };
        }
        return thread;
      });
    case ActionType.DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const vote = thread.downVotesBy.includes(action.payload.userId) || thread.upVotesBy.includes(action.payload.userId);
          return vote ? {
            ...thread,
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
          }
            : { ...thread, downVotesBy: thread.downVotesBy.concat([action.payload.userId]) };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
