import { connect } from 'react-redux'

import  {
  loadAppData,
  goTo,
} from '../../store/app/actions'

import  {
  loadUser,
} from '../../store/user/actions'

import  {
  setRoom,
  loadStatus,
} from '../../store/game/actions'

import App from './App'

const AppContainer = (props) => {
  const room_id = props.store_room ?? props.room_id
  return (
    <App
      {...props}
      room_id={room_id}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    appStatus: state.app.status,
    page: state.app.page,
    appError: state.app.error,
    user: state.user.user,
    userStatus: state.user.status,
    userError: state.user.error,
    store_room: state.game.room_id,
  }
}

const putActionToProps = {
  loadAppData: loadAppData,
  goTo: goTo,
  loadUser: loadUser,
  setRoom: setRoom,
  loadStatus: loadStatus,
}

export default connect(mapStateToProps, putActionToProps)(AppContainer)
