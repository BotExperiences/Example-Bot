import { Userstate } from 'tmi.js';
import Service from '@bot-experiences/framework/lib/Services';

export default class WelcomeService extends Service {
  onMessage(channel: string, userstate: Userstate, msg: string, self: boolean): void {
    if (!self) {
      if (msg.startsWith('!welcome')) {
        this.bot.sendChatMessage(`Welcome to the stream ${userstate['display-name']}`);
      }
    }
  }
}
