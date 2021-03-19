import React, { useEffect, useState } from 'react';
import { routeList } from '../../router'
import { View, ModalRoot, ModalCard, Button, SimpleCell, Avatar } from '@vkontakte/vkui'
import { Icon56ErrorOutline } from '@vkontakte/icons';
import { Icon56GhostOutline } from '@vkontakte/icons';
import { Icon28BombOutline } from '@vkontakte/icons';
import Lobby from './Lobby'
import Game from './Game'

const Room = (props) => {

  const {
    id,
    room_id,
    members,
    members_count,
    votes,
    has_vote_leader,
    connected,
    error,
    loaded,
    is_spy,
    is_start_round,
    location,
    possible_locations,
  } = props

  const {
    goTo,
    loadRoom,
    leaveRoom,
    startGame,
    vote,
    stopGame,
    selectLocation,
  } = props

  useEffect(() => {
    if (room_id) {
      loadRoom(room_id)
    }
  }, [room_id, loadRoom])

  const onLeaveRoom = () => {
    leaveRoom(room_id)
    goTo(routeList.home)
  }

  const [activeModal, setModal] = useState(null)

  useEffect(() => {
    if (error) {
      setModal('error')
    } else if (!error && loaded && !connected) {
      setModal('connecting')
    }
    setModal(null)
  }, [setModal, error, loaded, connected])


  const [activePanel, setPanel] = useState('lobby')

  const my_id = parseInt((new URLSearchParams(window.location.search)).get('vk_user_id'))

  const baseResult = {
    spy: {
      id: 0,
      first_name: '',
      last_name: '',
    },
    location: {
      name: ''
    }
  }

  const [result, setResult] = useState(baseResult)

  const onFinish = (result) => {
    setResult(result)
    if (
      ( my_id === result.spy.id && result.spy_winner )
      ||
      ( my_id !== result.spy.id && !result.spy_winner )
     ) {
      setModal('win')
    } else {
      setModal('loose')
    }
  }

  useEffect(() => {
    setPanel(is_start_round ? 'game' : 'lobby')
  }, [setPanel, is_start_round])

  const modals = (
    <ModalRoot activeModal={activeModal}>
      <ModalCard
        id="error"
        onClose={() => { onLeaveRoom() }}
        icon={<Icon56ErrorOutline />}
        header="Возникла ошибка при попытке загрузить комнату"
        subheader="Пожалуйста, попробуйте ещё раз"
        actions={
          <Button size="l" mode="primary" onClick={() => onLeaveRoom()}>
            Выйти
          </Button>
        }
      >
      </ModalCard>
      <ModalCard
        id="connecting"
        onClose={() => { onLeaveRoom() }}
        icon={<Icon56ErrorOutline />}
        header="Подключение..."
        subheader="Пожалуйста, дождитесь подключения к комнате"
        actions={
          <Button size="l" mode="primary" onClick={() => onLeaveRoom()}>
            Выйти
          </Button>
        }
      >
      </ModalCard>
      <ModalCard
        id="choose_location"
        onClose={() => setModal(null)}
        header="Выберите локацию"
        subheader="У вас есть только одна попытка"
      >
        {
          possible_locations.map(
            (location, i) => (
              <SimpleCell
                key={i}
                before={<Avatar size={40} src={location.img} />}
                onClick={() => { selectLocation(room_id, location.id, onFinish).then(() => { setModal(null) }) }}
              >{location.name}</SimpleCell>
            )
          )
        }
      </ModalCard>
      <ModalCard
        id="win"
        onClose={() => { setModal(null) }}
        icon={<Icon56GhostOutline  fill="#4CD964"/>}
        header="Вы выиграли!"
        subheader={`Шпионом был ${result.spy.first_name ?? ''} ${result.spy.last_name ?? ''}, а локация: ${result.location.name}`}
        actions={
          <Button size="l" mode="primary" onClick={() => { setModal(null); setResult(baseResult) }}>
            Вернуться в комнату
          </Button>
        }
      >
      </ModalCard>
      <ModalCard
        id="loose"
        onClose={() => { setModal(null) }}
        icon={<Icon28BombOutline height="56" width="56" fill="#EB4250"/>}
        header="Вы проиграли!"
        subheader={`Шпионом был ${result.spy.first_name ?? ''} ${result.spy.last_name ?? ''}, локация: ${result.location.name}`}
        actions={
          <Button size="l" mode="primary" onClick={() => { setModal(null); setResult(baseResult) }}>
            Вернуться в комнату
          </Button>
        }
      >
      </ModalCard>
    </ModalRoot>
  )

	return (
    <View id={id} modal={modals} activePanel={activePanel}>
      <Lobby id="lobby" members={members} members_count={members_count} room_id={room_id} onLeaveRoom={onLeaveRoom} startGame={startGame} />
      <Game
        id="game"
        members={members}
        members_count={members_count}
        room_id={room_id}
        is_spy={is_spy}
        location={location}
        possible_locations={possible_locations}
        votes={votes}
        vote={vote}
        has_vote_leader={has_vote_leader}
        stopGame={stopGame}
        setModal={setModal}
        onFinish={onFinish}
      />
    </View>
	);
};

export default Room;
