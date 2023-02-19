const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pong')
		.setDescription('pongpong'),
		async execute(interaction) {
			await interaction.reply('Pong!');
		},
};