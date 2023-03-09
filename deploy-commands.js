const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commandFiles = [];
const commands = [];

function recurseFiles (directory) {
  fs.readdirSync(directory).forEach(file => {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) return recurseFiles(absolute);
    else return commandFiles.push(absolute);
  });
}

recurseFiles('./commands');

for (const file of commandFiles) {
  const cmd = require(`./${file}`);
  commands.push(cmd.data.toJSON());
  console.log(`Deploying command: ./${file}`);
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORDTOKEN);

(async () => {
  try {
    // Test guild gommands
    await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORDCLIENTID, process.env.DISCORDGUILDID),
      { body: commands }
    );
    // Global commands
    await rest.put(
      Routes.applicationCommands(process.env.DISCORDCLIENTID),
      { body: commands }
    );
  } catch (e) {
    console.error(e);
  }
})();
