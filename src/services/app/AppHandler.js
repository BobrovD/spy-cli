import { routeList } from '../../router'
import gameHandler from '../game'

class AppHandler {
  async getAppData () {
    const room = gameHandler.getRoomIdFromHash();
    let page = '';
    if (room) {
      page = routeList.game
    } else {
      page = routeList.home
    }

    const appData = {
      page: page,
    }

    return appData
  }

  async setPage (page) {
    localStorage.setItem('app.page', page)
    return true
  }
}

export default AppHandler
