import { connect } from 'react-redux'

import  {
  goTo,
} from '../../store/app/actions'

// import  {
//   loadUser,
// } from '../../store/user/actions'

import  {
  leaveRoom,
  loadRoom,
  startGame,
  vote,
  stopGame,
  selectLocation,
} from '../../store/game/actions'

import Room from './Room'

const mapStateToProps = (state) => {
  const game = state.game
  return {
    status: game.status,
    connected: game.connected,
    loaded: game.loaded,
    is_spy: game.is_spy,
    is_start_round: game.is_start_round,
    location: game.location,
    possible_locations: game.possible_locations,
    members: game.members,
    members_count: game.members_count,
    votes: game.votes,
    error: game.error,
    has_vote_leader: game.has_vote_leader
  }
}

const putActionToProps = {
  loadRoom: loadRoom,
  leaveRoom: leaveRoom,
  startGame: startGame,
  goTo: goTo,
  vote: vote,
  stopGame: stopGame,
  selectLocation: selectLocation,
}

export default connect(mapStateToProps, putActionToProps)(Room)
