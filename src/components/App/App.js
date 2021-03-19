import React, { useEffect } from 'react';
import { AppRoot, Root } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { routeList } from '../../router'
import Home from '../Home'
import Info from '../Info'
import Room from '../Room'
import Error from '../Error'
import './App.css'

const App = (props) => {

  const {
    userStatus,
    userError,
    user,
    room_id,
  } = props

  let page = props.page

  const {
    loadAppData,
    goTo,
    loadUser,
    setRoom,
    loadStatus,
  } = props

  let errorMessage = '';

  if (userStatus === 'loading_error') {
    page = routeList.error
    errorMessage = userError;
  }

  useEffect(() => {
    loadAppData()
  }, [loadAppData])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  useEffect(() => {
    loadStatus(() => {
      goTo(routeList.game)
    })
  }, [loadStatus, goTo])

  return (
    <AppRoot className="app">
      <Root activeView={page}>
        <Home id={routeList.home} goTo={ goTo } user={user} setRoom={ setRoom } />
        <Info id={routeList.info} goTo={ goTo } />
        <Room id={routeList.game} goTo={ goTo } room_id={room_id} />
        <Error id={routeList.error} goTo={ goTo } message={errorMessage} />
      </Root>
    </AppRoot>
  );
}

export default App;
