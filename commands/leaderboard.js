const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getAllUsers } = require('../db/mongoose');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tilastot')
    .setDescription('PAHIMMAT NÄÄDÄT'),
    async execute(interaction) {
      const users = await getAllUsers();
      users.sort((a, b) => b.kouluCount - a.kouluCount);

      const embed = new EmbedBuilder()
        .setTitle('Hall of shame');

      let count = 0;
      users.forEach((user) => {
        if (count === 0) {
          embed.addFields({
            name: 'TOP NÄÄTÄ',
            value: `<@${user.id}>, koulukerrat: ${user.kouluCount}`
          });
        } else {
          embed.addFields({
            name: `NÄÄTÄ #${count+1}`,
            value: `<@${user.id}>, koulukerrat: ${user.kouluCount}`
          });
        }

        count += 1;
      });

      interaction.reply({ embeds: [embed] });
    }
};