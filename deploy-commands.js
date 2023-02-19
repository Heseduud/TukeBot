const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const cmd = require(`./commands/${file}`);
	commands.push(cmd.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORDTOKEN);

(async () => {
	try {
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.DISCORDCLIENTID, process.env.DISCORDGUILDID),
			{ body: commands },
		);
	} catch (e) {
		console.error(e);
	}
})();