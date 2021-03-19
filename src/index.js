import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import store from './store'
import 'core-js/es/map';
import 'core-js/es/set';
import gameHandler from './services/game'
import { ConfigProvider, AdaptivityProvider } from '@vkontakte/vkui'

import bridge from "@vkontakte/vk-bridge";

//Init VK  Mini App
bridge.send("VKWebAppInit");

window.bridge = bridge

const room_id = gameHandler.getRoomIdFromHash();

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <Provider store={store}>
        <App room_id={room_id}/>
      </Provider>
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById("root")
);

// if (process.env.NODE_ENV === "development") {
//   import("./eruda").then(({ default: eruda }) => {}); //runtime download
// }
