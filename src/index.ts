import ENV from './environment';

import tmi from 'tmi.js';
import Bot, { ChatClient } from 'bot-framework/src/Bot';
import Service from 'bot-framework/src/Services';

//@ts-ignore
const client: ChatClient = new tmi.client({
  options: {
    debug: false
  },
  identity: {
    username: ENV.credentials.username,
    password: ENV.credentials.password
  },
  channels: [ ENV.credentials.channel ]
})

class WelcomeService extends Service {
  onMessage(channel: string, userstate: UserState, msg: string, self: boolean) {
    if (!self) {
      if (msg.startsWith('!welcome')) {
        this.bot.sendChatMessage(`Welcome to the stream ${userstate['display-name']}`);
      }
    }
  }
}

let servInstance = new WelcomeService();

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
    servInstance
  ]
);
