import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("./db/main.db", (err) => {
  if (err) {
    return console.error(err.message);
  }

  db
    .run(`CREATE TABLE streams (
      stream_id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT
    );`)
    .run(`CREATE TABLE visitors (
      visitor_id TEXT PRIMARY KEY,
      display_name TEXT,
      first_seen TEXT
    );`)
    .run(`CREATE TABLE stream_visitors (
      stream_id INTEGER,
      visitor_id TEXT,
      seen_at TEXT,
      PRIMARY KEY (stream_id, visitor_id),
      FOREIGN KEY (stream_id)
        REFERENCES streams (stream_id)
          ON DELETE CASCADE
          ON UPDATE NO ACTION,
      FOREIGN KEY (visitor_id)
        REFERENCES visitors (visitor_id)
          ON DELETE CASCADE
          ON UPDATE NO ACTION
    );`);
});
