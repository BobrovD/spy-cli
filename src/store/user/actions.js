import { userHandler } from '../../services'

export const LOAD_USER_START   = 'LOAD_USER_START'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_ERROR   = 'LOAD_USER_ERROR'

export const SAVE_USER_START   = 'SAVE_USER_START'
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS'
export const SAVE_USER_ERROR   = 'SAVE_USER_ERROR'

const loadUserStart = () => ({
  type: LOAD_USER_START,
})

const loadUserSuccess = (user) => ({
  type: LOAD_USER_SUCCESS,
  payload: {
    user: user,
  }
})

const loadUserFailed = (error) => ({
  type: LOAD_USER_ERROR,
  payload: {
    error: error,
  }
})

export const loadUser = () => {
  return async (dispatch) => {
    dispatch(loadUserStart())

    try {
      const result = await userHandler.getUser()

      if (!result) {
        throw new Error('Ошибка загрузки пользователя');
      }

      dispatch(loadUserSuccess(result))
    } catch (e) {
      dispatch(loadUserFailed(e.message))
    }
  }
}
