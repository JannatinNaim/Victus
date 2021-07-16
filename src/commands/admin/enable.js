// Import Client for IntelliCode.
// eslint-disable-next-line no-unused-vars
const { Message, Client } = require('discord.js')

module.exports = {
  name: 'enable',
  /**
  * @param { Message } message
  * @param { Array } args
  * @param { Client } discordClient
  */
  run: async (message, args, discordClient) => {
    const userCommand = args[0]
    const commandScope = args[1] || 'guild'

    if (commandScope === 'guild') {
      const _guild = discordClient.guilds.cache.get(message.guild.id)
      const command = _guild.commands?.get(userCommand)
      if (!command) return
      command.disabled = false

      const { commandID } = command

      _guild.commands.forEach((_command) => {
        if (commandID === _command.commandID) _command.disabled = false
      })

      message.reply(`Enabled Command : ${command.name}`)
    }

    if (commandScope === 'global') {
      const command = discordClient.commands?.get(userCommand)
      if (!command) return
      command.disabled = false

      const { commandID } = command

      discordClient.commands.forEach((_command) => {
        if (commandID === _command.commandID) _command.disabled = false
      })

      message.reply(`Enabled Command : ${command.name}`)
    }
  },
  minArgs: 1,
  maxArgs: 2,
  expectedArgs: '<command_name> <global/guild>',
  requiredPermissions: 'ADMINISTRATOR',
  global: true
}
