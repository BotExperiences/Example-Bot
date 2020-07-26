import ENV from './environment';

import tmi from 'tmi.js';
import Bot, { ChatClient } from 'bot-framework/src/Bot';

import WelcomeService from './services/welcome';

//@ts-ignore
const client: ChatClient = new tmi.client({
  options: {
    debug: false,
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: ENV.credentials.username,
    password: ENV.credentials.password
  },
  channels: [ ENV.credentials.channel ]
})

new Bot(
  {
    banList: [],
    channel: ENV.credentials.channel,
    silent: false,
    connectedMessage: 'Example Bot reporting for duty'
  },
  client,
  {},
  [
    new WelcomeService()
  ]
);
