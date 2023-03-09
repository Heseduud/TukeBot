# TukeBot

Discord bot for friend group to track stuff with.

## How to run / get bot on my server?

At this time, you'll need to run the bot on your own.

First, you'll need to create your own bot from the discord dashboard. See: https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot
 
Then, create an .env file in the root directory with the following contents:

```
DISCORDTOKEN=Your discord bot token here
DISCORDCLIENTID=Discord app client id
DISCORDGUILDID=Guild id if you want to upload to a specific guild (see deploy-commands.js)
MONGOURI=MongoDb connection URI, I use MongoDb Atlas

```
Clone repo, then run:
```
npm i
npm run deploycmd
npm start
```
