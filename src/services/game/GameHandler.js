
import Centrifuge from 'centrifuge'
const centrifuge = new Centrifuge('wss://spy-game.ru/centrifugo/connection/websocket');

const apiUrl = 'https://spy-game.ru';
const apiActions = {
  createRoom: '/room',
  getRoom: '/room/{room_id}',
  status: '/status',
  joinRoom: '/room/{room_id}/join',
  leaveRoom: '/room/{room_id}/leave',
  startGame: '/room/{room_id}/start',
  vote: '/room/{room_id}/vote',
  stopGame: '/room/{room_id}/stop',
  selectLocation: '/room/{room_id}/select_location'
}

class GameHandler {
  async createRoom () {
    const response = await fetch(
      apiUrl + apiActions.createRoom + window.location.search,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    if (response.ok) {
      return await response.json()
    }

    throw new Error('При создании комнаты произошла ошибка')
  }

  async loadRoom(room_id) {
    const response = await fetch(
      apiUrl + apiActions.joinRoom.replace('{room_id}', room_id) + window.location.search,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    )
    if (response.ok) {
      const data = await response.json()
      if (!data.success) {
        throw new Error('При загрузке комнаты произошла ошибка')
      }

      data.data.users = await this.loadUsers(data.data.users)

      data.data.users = this.markVSUsers(data.data.users, data.data.votes)

      data.data.has_vote_leader = this.hasVoteLeader(data.data.users)

      return data.data
    }

    throw new Error('При загрузке комнаты произошла ошибка')
  }

  async status() {
    const response = await fetch(
      apiUrl + apiActions.status + window.location.search,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
    if (response.ok) {
      const data = await response.json()

      if (!data.data) {

        throw new Error('Пусто')
      }

      data.data.users = await this.loadUsers(data.data.users)

      data.data.users = this.markVSUsers(data.data.users, data.data.votes)

      data.data.has_vote_leader = this.hasVoteLeader(data.data.users)

      return data.data
    }

    throw new Error('При загрузке статуса произошла ошибка')
  }

  async vote(room_id, user_id) {
    const response = await fetch(
      apiUrl + apiActions.vote.replace('{room_id}', room_id) + window.location.search,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id})
      }
    )
    if (response.ok) {
      const data = await response.json()
      if (!data.success) {
        throw new Error('При запуске игры произошла ошибка')
      }

      return data.data
    }

    throw new Error('При запуске игры произошла ошибка')
  }

  async stopGame(room_id) {
    const response = await fetch(
      apiUrl + apiActions.stopGame.replace('{room_id}', room_id) + window.location.search,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    )
    if (response.ok) {
      const data = await response.json()

      const spy = await this.loadUsers([data.data.spy]);

      data.data.spy = spy[0]

      return data.data
    }

    throw new Error('При завершении игры произошла ошибка')
  }

  async selectLocation(room_id, location_code) {
    const response = await fetch(
      apiUrl + apiActions.selectLocation.replace('{room_id}', room_id) + window.location.search,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({location: location_code})
      }
    )
    if (response.ok) {
      const data = await response.json()

      const spy = await this.loadUsers([data.data.spy]);

      data.data.spy = spy[0]

      return data.data
    }

    throw new Error('При завершении игры произошла ошибка')
  }

  async leaveRoom(room_id) {
    const response = await fetch(
      apiUrl + apiActions.leaveRoom.replace('{room_id}', room_id) + window.location.search,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    )
    if (response.ok) {
      const data = await response.json()
      if (!data.success) {
        throw new Error('При выходе из комнаты произошла ошибка')
      }

      return data.data
    }

    throw new Error('При выходе из комнаты произошла ошибка')
  }

  async startGame(room_id) {
    const response = await fetch(
      apiUrl + apiActions.startGame.replace('{room_id}', room_id) + window.location.search,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    )
    if (response.ok) {
      const data = await response.json()
      if (!data.success) {
        throw new Error('При выходе из комнаты произошла ошибка')
      }

      return data.data
    }

    throw new Error('При выходе из комнаты произошла ошибка')
  }

  connectToRoom(room_id, onConnect, onDisconnect, onJoin, onLeave, onStart, onVote, onStop) {
    centrifuge.subscribe(`room:${room_id}`, async (message) => {
      switch (message.data.event) {
      case 'userJoinRoom':
        onJoin(message)
        break;
      case 'userLeaveRoom':
        onLeave(message)
        break;
      case 'start':
        onStart(message)
        break;
      case 'vote':
        onVote(message)
        break;
      case 'stop':
        onStop(message)
        break;
      default:
        break;
      }
    });

    centrifuge.on('connect', onConnect);

    centrifuge.on('disconnect', onDisconnect);

    centrifuge.connect();
  }

  disconnectFromRoom() {
    centrifuge.disconnect();
  }

  getRoomIdFromHash () {
    const hash = window.location.hash.substr(1);
    const result = hash.split('&').reduce(function (res, item) {
        var parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {});

    return result.room ?? null;
  }

  async loadUsers (ids) {
    const ids_string = ids.join(',')
    const responseToken = await window.bridge.send("VKWebAppGetAuthToken", {"app_id": 7794748, "scope": ""});
    const responseUsers = await window.bridge.send("VKWebAppCallAPIMethod", {"method": "users.get", "request_id": ids_string, "params": {"user_ids": ids_string, "v":"5.130", "fields": "photo_50", "access_token": responseToken.access_token}});
    return responseUsers.response
  }

  markVSUsers (users, votes) {
    const lenU = users.length
    for(let i = 0; i < lenU; i++) {
      let vote_count = 0;
      for(let voting in votes) {
        if (votes[voting] === users[i].id) {
          vote_count++
        }
      }
      users[i].vs = vote_count
    }
    return users;
  }

  hasVoteLeader (users) {
    const lenU = users.length
    const res = []
    for(let i = 0; i < lenU; i++) {
      res.push(users[i].vs)
    }
    res.sort(function(a, b){return b-a})
    return res[0] > res[1]
  }

}

export default GameHandler
