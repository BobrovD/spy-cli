import {
  LOAD_APP_DATA_START,
  LOAD_APP_DATA_SUCCESS,
  LOAD_APP_DATA_ERROR,
  SAVE_APP_DATA_START,
  SAVE_APP_DATA_SUCCESS,
  SAVE_APP_DATA_ERROR,
} from './actions'

import { routeList } from '../../router'
import gameHandler from '../../services/game'

const room_id = gameHandler.getRoomIdFromHash()

const INITIAL_STATE = {
  status: null,
  onBoard: false,
  page: room_id ? routeList.game : routeList.home,
  error: null,
}

export const  appReducer = (state = INITIAL_STATE, action) => {
  const payload = action.payload
  switch (action.type) {
  case LOAD_APP_DATA_START:
    return {
      ...state,
      status: 'loading',
      error: null,
    }
  case LOAD_APP_DATA_SUCCESS:
    return {
      ...state,
      status: 'ok',
      onBoard: payload.appData.onBoard,
      page: payload.appData.page,
      error: null,
    }
  case LOAD_APP_DATA_ERROR:
    return {
      ...state,
      status: 'loading_error',
      error: payload.error,
    }
  case SAVE_APP_DATA_START:
    return {
      ...state,
      status: 'saving',
      error: null,
    }
  case SAVE_APP_DATA_SUCCESS:
    return {
      ...state,
      status: 'ok',
      onBoard: payload.appData.onBoard,
      page: payload.appData.page,
      error: null,
    }
  case SAVE_APP_DATA_ERROR:
    return {
      ...state,
      status: 'saving_error',
      page: routeList.home,
      error: payload.error,
    }
  default:
    return state
  }
}
