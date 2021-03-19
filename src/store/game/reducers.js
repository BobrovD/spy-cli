import {
  SET_ROOM,
  CONNECT_ROOM_START,
  CONNECT_ROOM_SUCCESS,
  CONNECT_ROOM_ERROR,
  LOAD_ROOM_START,
  LOAD_ROOM_SUCCESS,
  LOAD_ROOM_ERROR,
  LOAD_MEMBERS_SUCCESS,
  LEAVE_ROOM_START,
  LEAVE_ROOM_SUCCESS,
  LEAVE_ROOM_ERROR,
} from './actions'

const INITIAL_STATE = {
  status: null,
  connected: false,
  loaded: false,
  room_id: null,
  is_spy: null,
  is_start_round: null,
  location: null,
  possible_locations: [],
  members: [],
  members_count: 0,
  votes: [],
  has_vote_leader: false,
  error: null,
}

export const gameReducer = (state = INITIAL_STATE, action) => {
  const payload = action.payload
  switch (action.type) {
  case SET_ROOM:
    return {
      ...state,
      status: 'ok',
      room_id: payload.room_id,
      error: null,
    }
  case CONNECT_ROOM_START:
    return {
      ...state,
      connected: false,
    }
  case CONNECT_ROOM_SUCCESS:
    return {
      ...state,
      connected: true,
    }
  case CONNECT_ROOM_ERROR:
    return {
      ...state,
      connected: false,
    }
  case LOAD_ROOM_START:
    return {
      ...state,
      status: 'loading',
      error: null,
    }
  case LOAD_ROOM_SUCCESS:
    return {
      ...state,
      status: 'ok',
      loaded: true,
      room_id: payload.room.name,
      members: JSON.parse(JSON.stringify(payload.room.users)),
      members_count: payload.room.users.length,
      votes: JSON.parse(JSON.stringify(payload.room.votes)),
      is_spy: payload.room.is_spy,
      is_start_round: payload.room.is_start_round,
      location: payload.room.location,
      possible_locations: JSON.parse(JSON.stringify(payload.room.possible_locations)),
      has_vote_leader: payload.room.has_vote_leader,
      error: null,
    }
  case LOAD_ROOM_ERROR:
    return {
      ...state,
      status: 'loading_error',
      loaded: false,
      error: payload.error,
    }
  case LOAD_MEMBERS_SUCCESS:
    return {
      ...state,
      status: 'ok',
      loaded: true,
      members: JSON.parse(JSON.stringify(payload.members)),
      members_count: payload.members.length,
      error: null,
    }
  case LEAVE_ROOM_START:
    return {
      ...state,
      status: 'loading',
      error: null,
    }
  case LEAVE_ROOM_SUCCESS:
    return {
      ...INITIAL_STATE,
    }
  case LEAVE_ROOM_ERROR:
    return {
      ...INITIAL_STATE,
    }
  default:
    return state
  }
}
