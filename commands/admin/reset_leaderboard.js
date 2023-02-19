const { SlashCommandBuilder } = require('discord.js');
const { resetLeaderboard } = require('../../db/mongoose');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resetLeaderboard')
    .setDescription('Reset the leaderboard')
    .setDefaultMemberPermissions(0),
    async execute(interaction) {
      await resetLeaderboard();
      await interaction.reply({ content: 'Leaderboard reset! ', ephemeral: true });
    }
}