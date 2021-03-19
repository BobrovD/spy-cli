import { gameHandler } from '../../services'
import { appHandler } from '../../services'
import { routeList } from '../../router'

export const SET_ROOM               = 'SET_ROOM'

export const CONNECT_ROOM_START     = 'CONNECT_ROOM_START'
export const CONNECT_ROOM_SUCCESS   = 'CONNECT_ROOM_SUCCESS'
export const CONNECT_ROOM_ERROR     = 'CONNECT_ROOM_ERROR'

export const LOAD_ROOM_START     = 'LOAD_ROOM_START'
export const LOAD_ROOM_SUCCESS   = 'LOAD_ROOM_SUCCESS'
export const LOAD_ROOM_ERROR     = 'LOAD_ROOM_ERROR'

export const LOAD_MEMBERS_SUCCESS = 'LOAD_MEMBERS_SUCCESS'

export const LEAVE_ROOM_START     = 'LEAVE_ROOM_START'
export const LEAVE_ROOM_SUCCESS   = 'LEAVE_ROOM_SUCCESS'
export const LEAVE_ROOM_ERROR     = 'LEAVE_ROOM_ERROR'

const setRoomSuccess = (room_id) => ({
  type: SET_ROOM,
  payload: {
    room_id: room_id,
  }
})

const loadRoomStart = () => ({
  type: LOAD_ROOM_START
})

const loadRoomSuccess = (room) => ({
  type: LOAD_ROOM_SUCCESS,
  payload: {
    room: room
  }
})

const loadMembersSuccess = (members) => ({
  type: LOAD_MEMBERS_SUCCESS,
  payload: {
    members: members
  }
})

const loadRoomFailed = (error) => ({
  type: LOAD_ROOM_ERROR,
  payload: {
    error: error
  }
})

const leaveRoomStart = () => ({
  type: LEAVE_ROOM_START
})

const leaveRoomSuccess = () => ({
  type: LEAVE_ROOM_SUCCESS,
})

const leaveRoomFailed = (error) => ({
  type: LEAVE_ROOM_ERROR,
  payload: {
    error: error
  }
})

const connectRoomStart = () => ({
  type: CONNECT_ROOM_START,
})

const connectRoomSuccess = () => ({
  type: CONNECT_ROOM_SUCCESS,
})

const connectRoomFailed = (error) => ({
  type: CONNECT_ROOM_ERROR,
  payload: {
    error: error,
  }
})

const disconnectRoomStart = () => ({
  type: CONNECT_ROOM_START,
})

const disconnectRoomSuccess = () => ({
  type: CONNECT_ROOM_SUCCESS,
})

const disconnectRoomFailed = () => ({
  type: CONNECT_ROOM_ERROR
})

export const setRoom = (room_id) => {
  return async (dispatch) => {
    dispatch(setRoomSuccess(room_id))
  }
}

export const connectToRoom = () => {
  return async (dispatch) => {
    dispatch(connectRoomStart())

    try {

    } catch (e) {
      dispatch(connectRoomFailed(e.message))
    }
  }
}

export const loadRoom = (room_id) => {
  return async (dispatch) => {
    dispatch(loadRoomStart())

    try {
      const room = await gameHandler.loadRoom(room_id)

      gameHandler.connectToRoom(room_id, () => {
        dispatch(connectRoomSuccess())
      }, () => {
        dispatch(connectRoomFailed())
      }, async (message) => {
        const users = await gameHandler.loadUsers(message.data.users)
        dispatch(loadMembersSuccess(users))
      }, async (message) => {
        const users = await gameHandler.loadUsers(message.data.users)
        dispatch(loadMembersSuccess(users))
      }, async () => {
        const room = await gameHandler.status()
        dispatch(loadRoomSuccess(room))
      }, async () => {
        const room = await gameHandler.status()
        dispatch(loadRoomSuccess(room))
      }, async () => {
        const room = await gameHandler.status()
        dispatch(loadRoomSuccess(room))
      })

      dispatch(loadRoomSuccess(room))
    } catch (e) {
      dispatch(loadRoomFailed(e.message))
    }
  }
}

export const loadStatus = (callback) => {
  return async (dispatch) => {
    try {
      const room = await gameHandler.status()
      dispatch(loadRoomSuccess(room))

      if (callback) {
        callback()
      }

    } catch (e) {

    }
  }
}

export const leaveRoom = (room_id) => {
  return async (dispatch) => {
    dispatch(leaveRoomStart())

    try {
      await gameHandler.leaveRoom(room_id)

      gameHandler.disconnectFromRoom()

      dispatch(leaveRoomSuccess())
    } catch (e) {
      dispatch(leaveRoomFailed(e.message))
    }
  }
}

export const startGame = (room_id) => {
  return async (dispatch) => {
    // dispatch(startGameStart())

    try {
      const room = await gameHandler.startGame(room_id)

      // dispatch(startGameSuccess(room))
    } catch (e) {
      // dispatch(startGameFailed(e.message))
    }
  }
}

export const vote = (room_id, user_id) => {
  return async (dispatch) => {
    // dispatch(loadRoomStart())

    try {
      await gameHandler.vote(room_id, user_id)

      // dispatch(loadRoomFailed())
    } catch (e) {
      // dispatch(loadRoomFailed(e.message))
    }
  }
}

export const stopGame = (room_id, onResult) => {
  return async (dispatch) => {
    // dispatch(loadRoomStart())

    try {
      const response = await gameHandler.stopGame(room_id)

      onResult(response)

      // dispatch(loadRoomFailed())
    } catch (e) {
      // dispatch(loadRoomFailed(e.message))
    }
  }
}

export const selectLocation = (room_id, location_code, onResult) => {
  return async (dispatch) => {
    // dispatch(loadRoomStart())

    try {
      const response = await gameHandler.selectLocation(room_id, location_code)

      onResult(response)

      // dispatch(loadRoomFailed())
    } catch (e) {
      // dispatch(loadRoomFailed(e.message))
    }
  }
}

export const disconnectFomRoom = () => {
  return async (dispatch) => {
    dispatch(disconnectRoomStart())

    try {
      await gameHandler.disconnectFromRoom(() => {
        dispatch(disconnectRoomSuccess())
      })
    } catch (e) {
      dispatch(disconnectRoomFailed(e.message))
    }
  }
}
