const { SlashCommandBuilder } = require('discord.js');
const { addMoment } = require('../db/mongoose');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('momentti')
    .setDescription('kuka sekoili?')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('NII KUKA')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('momentti')
        .setDescription('MITÄ NYT TAAS')
        .setRequired(true)
    ),
  async execute (interaction) {
    const user = interaction.options.getUser('user');
    const text = interaction.options.getString('momentti');

    await addMoment(user.id, text);
    await interaction.reply(`<@${user.id}> LOMPPA MOMENT! MOMENTTI: ${text}`);
  }
};
