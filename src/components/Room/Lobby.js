import React, { useState } from 'react';
import { Panel, Spacing, Tabs, TabsItem, Card, Title, Div, Text, SubnavigationBar, SubnavigationButton, Button, Snackbar, Avatar, MiniInfoCell, Group, SimpleCell } from '@vkontakte/vkui'
import qr from '@vkontakte/vk-qr'
import './Lobby.css'
import { Icon16Done } from '@vkontakte/icons';
import { Icon20Info } from '@vkontakte/icons';

const Lobby = (props) => {

  const {
    members,
    room_id,
  } = props

  const {
    startGame,
    onLeaveRoom,
  } = props

  const shareUrl = `https://vk.com/app7794748#room=${room_id}`

  const qrSvg = qr.createQR(shareUrl, {
    qrSize: 256,
    isShowLogo: true
  })

  const onShare = () => {
    window.bridge.send("VKWebAppShare", {"link": shareUrl});
  }

  const onCopy = async () => {
    window.bridge.send("VKWebAppCopyText", {"text": shareUrl}).then((result) => {
      if (result) {
        openSnackBar()
      }
    });
  }

  const onStartGame = () => {
    startGame(room_id)
  }

  const [SnackbarCopied, setSnackbar] = useState(null)

  const openSnackBar = () => {
    if (SnackbarCopied) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Avatar size={24} style={{ background: 'var(--accent)' }}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
      >
        Ссылка скопирована
      </Snackbar>
    );
  }

  const [activeTab, setActiveTab] = useState('control')

  return (
    <Panel id="lobby" className='room--lobby'>
      <Tabs>
        <TabsItem
          onClick={() => { setActiveTab('control') }}
          selected={activeTab === 'control'}
        >
          Управление
        </TabsItem>
        <TabsItem
          onClick={() => { setActiveTab('members') }}
          selected={activeTab === 'members'}
        >
          Участники {members.length ? `(${members.length})` : ''}
        </TabsItem>
      </Tabs>
      <Spacing separator />
        { activeTab === 'control' ?
          <Div id="control">
            <Card className='card--qr' mode="shadow">
              <Title level={1} weight='semibold'>QR-код для подключения</Title>
              <Div className="qr" dangerouslySetInnerHTML={{__html: qrSvg}}></Div>
              <Text>
                Передайте его другим участникам. <br />
                Либо используйте текстовый код: <br />
                <b>{ room_id }</b>
              </Text>
              <SubnavigationBar mode="fixed">
                <SubnavigationButton
                  size="l"
                  onClick={() => { onShare() }}
                >
                  Поделиться
                </SubnavigationButton>
                <SubnavigationButton
                  size="l"
                  onClick={() => { onCopy() }}
                >
                  Скопировать код
                </SubnavigationButton>
              </SubnavigationBar>
            </Card>
            { members.length >= 3
              ? <Button size="l" stretched onClick={ () => { onStartGame() } }>Начать</Button>
              : <Button size="l" stretched disabled onClick={ () => { onStartGame() } }>Начать</Button>
            }
            <MiniInfoCell className="info"
              textWrap="full"
              before={<Icon20Info />}
            >
              Для начала нужно 3 и более участников.<br />После начала игры присоединиться новым участникам будет нельзя.
            </MiniInfoCell>
            <Spacing separator />
            <Button size="l" className="leave" stretched onClick={ () => { onLeaveRoom() } }>Выйти из комнаты</Button>
            { SnackbarCopied ?? '' }
          </Div>
          :
          <Div id="members">
            <Group>
            {
              members.map(
                (member, i) => (
                  <SimpleCell
                    before={<Avatar size={40} src={member.photo_50} />}
                  >{ member.first_name ?? '' } { member.last_name ?? '' }</SimpleCell>
                )
              )
            }
            </Group>
          </Div>
        }
    </Panel>
  )
}
export default Lobby
