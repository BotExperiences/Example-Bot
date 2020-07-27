import ENV from './environment';

import tmi from 'tmi.js';
import Bot, { ChatClient } from 'bot-framework/src/Bot';
import sqlite3 from 'sqlite3';

import TrackerService from './services/tracker';

const db = new sqlite3.Database("./db/main.db", (err) => {
  if (err) {
    return console.error(err.message);
  }

  const context: any = {
    db,
    currentStreamId: undefined
  }

  if (ENV.newStream) {
    db.serialize(() => {
      db.run(`INSERT INTO streams (date) VALUES (datetime('now'))`);
      db.get(`SELECT last_insert_rowid()`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log('inserted new stream', row['last_insert_rowid()']);
        context.currentStreamId = row['last_insert_rowid()'];
      })
    });
  }

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
  });

  new Bot(
    {
      banList: [],
      channel: ENV.credentials.channel,
      silent: false,
      connectedMessage: 'Example Bot reporting for duty'
    },
    client,
    context,
    [
      new TrackerService()
    ]
  );
});
