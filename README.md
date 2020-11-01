# Example-Bot

Use this as an example/template for working with [`@bot-experiences/framework`](https://github.com/BotExperiences/Bot-Framework).

## Requirements

- node.js / npm
- twitch account and [oauth token](https://twitchapps.com/tmi/) re [twitch docs](https://dev.twitch.tv/docs/irc#building-the-bot)

## Installation

- download this repository (fork / clone / [zip](https://github.com/BotExperiences/Example-Bot/archive/master.zip) / [template](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template))
- (optional) update [package.json](package.json) with your own information
- (optional) rename the directory
- install the dependencies by running `npm install`
- create a `.env` [file](https://github.com/motdotla/dotenv) in the root of the directory like so:

```
# .env
channel=TwitchChannelConnectingto
username=YourTwitchChannel
password=oauth:somekeyhere
```

## Usage

- `npm start` to run the bot
- `npm run lint` to check the source code for eslint errors

## Extending

Most use cases will likely be done through [services](src/services/), note how [src/index.ts](src/index.ts) imports the welcome service and passes it into the Bot instance. The framework exposes a context you can use as an escape hatch to provide greater utility (such as websockets or global state).