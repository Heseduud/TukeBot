const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = [];

function recurseFiles(directory) {
	fs.readdirSync(directory).forEach(file => {
		const absolute = path.join(directory, file);
		if (fs.statSync(absolute).isDirectory()) return recurseFiles(absolute);
		else return commandFiles.push(absolute);
	});
}

recurseFiles('./commands');

for (const file of commandFiles) {
	const command = require(`./file`);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`Command at ./${file} missing data or execute property`);
	}
}

mongoose.connect(process.env.MONGOURI)
	.then(() => console.log('Connected to Mongo'))
	.catch((e) => console.error(`Unable to connect to Mongo: ${e}`));

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`Command ${interaction.commandName} not found`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (e) {
		console.error(e);
		await interaction.reply({ content: 'Error executing command', ephemeral: true });
	}
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORDTOKEN);