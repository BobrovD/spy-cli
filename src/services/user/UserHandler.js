import bridge from "@vkontakte/vk-bridge";

class UserHandler {
  async getUser() {
    const data = await bridge.send('VKWebAppGetUserInfo')
    return data;
  }
}

export default UserHandler
