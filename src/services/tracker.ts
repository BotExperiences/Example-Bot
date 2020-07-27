import Service from 'bot-framework/src/Services';
import { CommonUserstate } from 'tmi.js';

export default class TrackerService extends Service {
  onMessage(channel: string, userstate: CommonUserstate, msg: string, self: boolean) {
    if (!self) {
      this.visitorsSql(userstate['user-id'], userstate['display-name']);
    }
  }

  visitorsSql(visitorId: string, displayName: string) {
    let visitorSql = `
      SELECT visitor_id id
      FROM visitors
      WHERE visitor_id = ?
    `;
    this.bot.context.db.get(visitorSql, [visitorId], (err: any, row: any) => {
      if (err) {
        return console.error(err.message);
      }

      if (!row) {
        this.bot.context.db.run(`
            INSERT INTO visitors (visitor_id, display_name, first_seen)
            VALUES (?, ?, datetime('now'))
          `,
          [
            visitorId,
            displayName
          ],
          (err: any) => {
            if (err) {
              return console.error(err.message);
            }
            console.log(`recorded user ${visitorId}`);
            this.streamVisitorsSql(visitorId);
          }
        );
      }
      else {
        this.streamVisitorsSql(visitorId);
      }
    })
  }

  streamVisitorsSql(visitorId: string) {
    let visitorStreamsSql = `
      SELECT visitor_id id
      FROM stream_visitors
      WHERE
        visitor_id = ?
        AND
        stream_id = ?
    `;
    this.bot.context.db.get(visitorStreamsSql, [visitorId, this.bot.context.currentStreamId], (err: any, row: any) => {
      if (err) {
        return console.error(err.message);
      }

      if (!row) {
        this.bot.context.db.run(`
          INSERT INTO stream_visitors (visitor_id, stream_id, seen_at)
          VALUES (?, ?, datetime('now'))
        `,
        [visitorId, this.bot.context.currentStreamId],
        (err: any) => {
          if (err) {
            return console.error(err.message);
          }
          console.log(`recorded user ${visitorId} in stream ${this.bot.context.currentStreamId}`);
        });
      }
    })
  }
}
