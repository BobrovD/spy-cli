import React, { useState } from 'react';
import { Panel, Spacing, Tabs, TabsItem, Header, List, Cell, SimpleCell, ContentCard, ModalRoot, ModalCard, Div, Text, SubnavigationBar, SubnavigationButton, Button, Snackbar, Avatar, MiniInfoCell, Group } from '@vkontakte/vkui'
import { Icon28LiveOutline } from '@vkontakte/icons';
import { Icon24ChevronCompactRight } from '@vkontakte/icons';
import './Game.css'

const Game = (props) => {

  const {
    members,
    votes,
    room_id,
    has_vote_leader,
    is_spy,
    location,
    possible_locations,
  } = props

  const {
    vote,
    stopGame,
    setModal,
    onFinish,
  } = props

  const [activeTab, setActiveTab] = useState('game')

  const my_id = parseInt((new URLSearchParams(window.location.search)).get('vk_user_id'))

  const my_vote = votes[my_id] ?? null

  return (
    <Panel id="game" className="room--game">
      <Tabs>
        <TabsItem
          onClick={() => { setActiveTab('game') }}
          selected={activeTab === 'game'}
        >
          Игра
        </TabsItem>
        <TabsItem
          onClick={() => { setActiveTab('card') }}
          selected={activeTab === 'card'}
        >
          Моя карта
        </TabsItem>
        <TabsItem
          onClick={() => { setActiveTab('locations') }}
          selected={activeTab === 'locations'}
        >
          Локации
        </TabsItem>
      </Tabs>
      <Spacing separator />
      { activeTab === 'game'
        ? <Div>
          <Group header={<Header mode="secondary">Доступные действия</Header>}>
            <List>
              <SimpleCell
                before={<Icon28LiveOutline />}
                description="Доступна только шпиону"
                after={<Icon24ChevronCompactRight />}
                onClick={() => { if (is_spy) { setModal('choose_location') } }}
              >Угадать локацию</SimpleCell>
            </List>
          </Group>
          <Group header={<Header mode="secondary">Голосование против шпиона</Header>}>
            <List>
              {
                members.map(
                  (member, i) => (
                    <Cell
                      key={i}
                      selectable
                      checked={my_vote === member.id}
                      disabled={my_id === member.id}
                      style={my_id === member.id ? {opacity: 0.4} : {}}
                      onClick={() => { vote(room_id, member.id) }}
                      onChange={() => { }}
                      before={<Avatar size={40} src={member.photo_50} />}
                      description={`Голосов против: ${member.vs ?? 0}`}
                    >{ member.first_name ?? '' } { member.last_name ?? '' }</Cell>
                  )
                )
              }

            </List>
          </Group>
          <Spacing separator />
          <Button
            className="game--end"
            stretched
            size="l"
            disabled={!has_vote_leader}
            mode="tertiary"
            onClick={ () => { stopGame(room_id, onFinish) } }
          >
            Завершить игру
          </Button>
        </Div>
        : '' }
        { activeTab === 'card'
        ? <Div>
          { is_spy
            ? <ContentCard
              image="https://spy-game.ru/storage/locations/spy.png"
              header="Карта шпиона!"
              text="Вы - шпион и не знаете локацию."
              maxHeight={500}
            />
            : <ContentCard
              image={location.img}
              header={location.name}
              maxHeight={500}
            />
          }
        </Div>
        : '' }
        { activeTab === 'locations'
        ? <Div>
          <MiniInfoCell
            textWrap="full"
            textLevel="primary"
            className="locations--cell"
          >
            Возможные локации данного раунда.<br />Шпион не знает текущую локацию.
          </MiniInfoCell>
          {
            possible_locations.map(
              (location, i) => (
                <ContentCard
                  className="locations--card"
                  key={i}
                  image={location.img}
                  header={location.name}
                  maxHeight={500}
                />
              )
            )
          }
        </Div>
        : '' }
    </Panel>
  )
}
export default Game
