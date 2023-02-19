const { SlashCommandBuilder } = require('discord.js');
const { resetLeaderboard } = require('../../db/mongoose');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resetleaderboard')
    .setDescription('Reset the leaderboard')
    .setDefaultMemberPermissions(str(1 << 5)),
    async execute(interaction) {
      await resetLeaderboard();
      await interaction.reply({ content: 'Leaderboard reset! ', ephemeral: true });
    }
}