import React, { useState } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import { View, Card, Button, Title, Text, Group, Cell, ModalRoot, ModalCard, Input } from '@vkontakte/vkui'
import { routeList } from '../../router'
import './Home.css'
import { Icon28AddCircleOutline } from '@vkontakte/icons';
import { Icon28ChainOutline } from '@vkontakte/icons';
import gameHandler from '../../services/game'

const MODAL_JOIN = 'join'
const MODAL_JOIN_CODE = 'join-code'
// const MODAL_JOIN_QR = 'join-qr'

const Home = (props) => {

  const {
    id,
  } = props

  const {
    goTo,
    setRoom,
  } = props

  const [room_id, setRoomId] = useState('')

  const [activeModal, openModal] = useState(null)

  const onCreateRoom = async () => {
    const room = await gameHandler.createRoom()
    await setRoom(room.data.name)
    goTo(routeList.game)
  }

  const onSetGame = async () => {
    await setRoom(room_id)
    goTo(routeList.game)
  }

  const modals = (
    <ModalRoot activeModal={activeModal}>
      <ModalCard
        id="join"
        onClose={() => openModal(null)}
        icon={<Icon28ChainOutline />}
        header="Подключиться к игре"
        subheader="Попросите у организатора игры цифровой или QR-код, либо ссылку для подключения"
        actions={
          <Button size="l" mode="primary" onClick={() => openModal(MODAL_JOIN_CODE)}>
            Ввести код игры вручную
          </Button>
        }
      >
      </ModalCard>
      <ModalCard
        id="join-code"
        onClose={() => openModal(MODAL_JOIN)}
        header="Подключение к игре"
        subheader="Введите код, полученный от организатора игры:"
        actions={
          <Button size="l" mode="primary" onClick={ () => { onSetGame() } }>
            Подключиться
          </Button>
        }
      >
        <Input name="game-code" onChange={ (e) => { setRoomId(e.target.value) } } />
      </ModalCard>
    </ModalRoot>
  );

	return (
    <View id={id} modal={modals}>
      <Panel className="panel--home">
        <Card mode="outline" className="card--info">
          <Title weight="semibold" level="2" className="title">Добро пожаловать!</Title>
          <Text className="text">Узнайте больше об игре из нашего руководства</Text>
          <Button onClick={ () => { goTo(routeList.info) } } className="button" mode="overlay_primary">Информация об игре</Button>
        </Card>
        <Group>
            <Cell expandable onClick={ () => { onCreateRoom() } } before={<Icon28AddCircleOutline />}>Создать игру</Cell>
            <Cell expandable onClick={ () => { openModal(MODAL_JOIN) } } before={<Icon28ChainOutline />}>Присоединиться</Cell>
        </Group>
      </Panel>
    </View>
	);
};

export default Home;
