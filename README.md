# Example-Bot

Use this as an exampe for working with [`@bot-experiences/framework`](https://github.com/BotExperiences/Bot-Framework).

## Requirements

- node.js / npm
- twitch account and [oauth token](https://twitchapps.com/tmi/) re [twitch docs](https://dev.twitch.tv/docs/irc#building-the-bot)

## Installation

- update [package.json](package.json) with your own information
- `npm install`
- create a `.env` [file](https://github.com/motdotla/dotenv) in the root of the directory like so:

```
# .env
channel=TwitchChannelConnectingto
username=YourTwitchChannel
password=oauth:somekeyhere
```

## Usage

- `npm start`

## Extending

Most use cases will likely be done through [services](src/services/), note how [src/index.ts](src/index.ts) imports the welcome service and passes it into the Bot instance. The framework exposes a context you can use as an escape hatch to provide greater utility (such as websockets or global state).