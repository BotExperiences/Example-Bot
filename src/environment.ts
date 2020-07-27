import dotenv from 'dotenv';

dotenv.config();

export default {
  credentials: {
    channel: process.env.channel,
    username: process.env.username,
    password: process.env.password,
  },
  newStream: true
}
