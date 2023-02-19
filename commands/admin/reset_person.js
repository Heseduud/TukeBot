const { SlashCommandBuilder } = require('discord.js');
const { resetPerson } = require('../../db/mongoose');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resetuser')
    .setDescription('Reset user')
    .setDefaultMemberPermissions(str(1 << 5))
    .addUserOption(option =>
      option.setName('user')
            .setDescription('User to reset')
            .setRequired(true)
    ),
    async execute(interaction) {
      const user = interaction.options.getUser('user');
      await resetPerson(user.id);
      await interaction.reply({ content: `User <@${user.id}> reset!`, ephemeral: true });
    }
}