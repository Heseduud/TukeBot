const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getMoments } = require('../db/mongoose');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('momentit')
    .setDescription('duudsonin momentit')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('kenen momentit...')
        .setRequired(true)
    ),
  async execute (interaction) {
    const user = interaction.options.getUser('user');
    const moments = await getMoments(user.id);

    const embed = new EmbedBuilder()
      .setTitle('Kootut sekoilut');

    let count = 1;
    moments.forEach((moment) => {
      embed.addFields({
        name: `Momentti #${count}`,
        value: moment.text
      });

      count++;
    });

    interaction.reply({ embeds: [embed] });
  }
};
