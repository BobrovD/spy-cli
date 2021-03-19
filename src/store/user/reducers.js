import {
  LOAD_USER_START,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
} from './actions'

const INITIAL_STATE = {
  status: null,
  user: null,
  error: null,
}

export const userReducer = (state = INITIAL_STATE, action) => {
  const payload = action.payload
  switch (action.type) {
  case LOAD_USER_START:
    return {
      ...state,
      status: 'loading',
      error: null,
    }
  case LOAD_USER_SUCCESS:
    return {
      ...state,
      status: 'ok',
      user: payload.user,
      error: null,
    }
  case LOAD_USER_ERROR:
    return {
      ...state,
      status: 'loading_error',
      user: null,
      error: payload.error,
    }
  default:
    return state
  }
}
