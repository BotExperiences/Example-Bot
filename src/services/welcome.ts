import Service from 'bot-framework/src/Services';

export default class WelcomeService extends Service {
  onMessage(channel: string, userstate: UserState, msg: string, self: boolean) {
    if (!self) {
      if (msg.startsWith('!welcome')) {
        this.bot.sendChatMessage(`Welcome to the stream ${userstate['display-name']}`);
      }
    }
  }
}
