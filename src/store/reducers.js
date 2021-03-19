import { combineReducers } from 'redux'
import { appReducer } from './app/reducers'
import { gameReducer } from './game/reducers'
import { userReducer } from './user/reducers'


export default combineReducers({
  app: appReducer,
  game: gameReducer,
  user: userReducer,
})
