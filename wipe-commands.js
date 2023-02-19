// Running this will delete all commands from discord API, only ran locally
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORDTOKEN);

rest.put(Routes.applicationGuildCommands(process.env.DISCORDCLIENTID, process.env.DISCORDGUILDID), { body: [] })
  .then(() => console.log('Deleted all test guild commands'))
  .catch(console.error);

rest.put(Routes.applicationCommands(process.env.DISCORDCLIENTID), { body: [] })
  .then(() => console.log('Deleted all global commands'))
  .catch(console.error);