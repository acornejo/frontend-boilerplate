import { createAction, handleActions } from 'redux-actions';

const ADD_TODO = 'addTodo';
const DELETE_TODO = 'deleteTodo';
const COMPLETE_TODO = 'completeTodo';

const initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}];

// functions to dispatch actions
export const actionCreators = {
  [ADD_TODO]: createAction(ADD_TODO),
  [DELETE_TODO]: createAction(DELETE_TODO),
  [COMPLETE_TODO]: createAction(COMPLETE_TODO),
};

// functions to apply actions to state
export const actionReducers = handleActions({
  [ADD_TODO] (state, action) {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.payload
    }, ...state]
  },

  [DELETE_TODO] (state, action) {
    return state.filter(todo => todo.id !== action.payload )
  },

  [COMPLETE_TODO] (state, action) {
    return state.map(todo => {
      return todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    })
  }
}, initialState)
