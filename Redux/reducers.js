import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
} from './actions'

const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  console.log('function todos', arguments)
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          })
        }
        return todo
      })
    default:
      return state
  }
}

function test(
  state = {
    arr: [1, 2],
    get arr2() {
      return this.arr.map(v => v * 2)
    },
  },
  action,
) {
  console.log('function test', arguments)

  return state
}

const todoApp = combineReducers({ visibilityFilter, todos, test })

export default todoApp
