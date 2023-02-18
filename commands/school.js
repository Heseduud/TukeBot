const { SlashCommandBuilder } = require('discord.js');
const { addCount } = require('../db/mongoose');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('koulu')
    .setDescription('TUKEKOULUUN')
    .addUserOption(option =>
      option.setName('user')
            .setDescription('KUKA LAITETAAN KOULUUN')
            .setRequired(true)
      ),
    async execute(interaction) {
      const user = interaction.options.getUser('user');
      const res = await addCount(user.id);
      await interaction.reply(`<@${user.id}> TUKEKOULUUN! KOULUKERTOJA: ${res.kouluCount}`);
    }
};