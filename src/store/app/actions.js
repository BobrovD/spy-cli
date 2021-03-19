import { appHandler } from '../../services'

export const LOAD_APP_DATA_START   = 'LOAD_APP_DATA_START'
export const LOAD_APP_DATA_SUCCESS = 'LOAD_APP_DATA_SUCCESS'
export const LOAD_APP_DATA_ERROR   = 'LOAD_APP_DATA_ERROR'

export const SAVE_APP_DATA_START   = 'SAVE_APP_DATA_START'
export const SAVE_APP_DATA_SUCCESS = 'SAVE_APP_DATA_SUCCESS'
export const SAVE_APP_DATA_ERROR   = 'SAVE_APP_DATA_ERROR'

const loadAppDataStart = () => ({
  type: LOAD_APP_DATA_START,
})

const loadAppDataSuccess = (appData) => ({
  type: LOAD_APP_DATA_SUCCESS,
  payload: {
    appData: appData,
  }
})

const loadAppDataFailed = (error) => ({
  type: LOAD_APP_DATA_ERROR,
  payload: {
    error: error,
  }
})

const saveAppDataStart = () => ({
  type: SAVE_APP_DATA_START,
})

const saveAppDataSuccess = (appData) => ({
  type: SAVE_APP_DATA_SUCCESS,
  payload: {
    appData: appData,
  }
})

const saveAppDataFailed = (error) => ({
  type: SAVE_APP_DATA_ERROR,
  payload: {
    error: error,
  }
})

export const loadAppData = () => {
  return async (dispatch) => {
    dispatch(loadAppDataStart())

    try {
      const result = await appHandler.getAppData()

      dispatch(loadAppDataSuccess(result))
    } catch (e) {
      dispatch(loadAppDataFailed(e.message))
    }
  }
}

export const goTo = (page) => {
  return async (dispatch, getState) => {
    dispatch(saveAppDataStart())

    const state = getState().app
    state.page = page

    try {
      await appHandler.setPage(state.page)

      dispatch(saveAppDataSuccess(state))
    } catch (e) {
      dispatch(saveAppDataFailed(e.message))
    }
  }
}
