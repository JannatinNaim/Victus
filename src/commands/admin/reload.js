// Import Client for IntelliCode.
// eslint-disable-next-line no-unused-vars
const { Message, Client } = require('discord.js')

const loadFiles = require('../../functions/loadFiles.js')

module.exports = {
  name: 'reload',
  /**
   * @param { Message } message
   * @param { Array } args
   * @param { Client } discordClient
   */
  run: async (message, args, discordClient) => {
    const commands = await loadFiles('../commands')

    commands.forEach(async (command) => {
      if (command.name !== args[0]) return

      let {
        name,
        run,
        aliases = [],
        description = '',
        minArgs = 0,
        maxArgs = null,
        expectedArgs = '',
        requiredPermissions = []
      } = command

      if (typeof requiredPermissions === 'string') {
        requiredPermissions = [requiredPermissions]
      }

      aliases = [name, ...aliases]

      if (command.global) {
        aliases.forEach((alias) => {
          discordClient.commands.set(alias, {
            name,
            run,
            description,
            minArgs,
            maxArgs,
            expectedArgs,
            requiredPermissions
          })
        })
      }

      aliases.forEach((alias) => {
        discordClient.guilds.cache.forEach((guild) => {
          guild.commands.set(alias, {
            name,
            run,
            description,
            minArgs,
            maxArgs,
            expectedArgs,
            requiredPermissions
          })
        })
      })

      message.reply(`Reloaded Command : ${name}`)
    })
  },
  minArgs: 1,
  expectedArgs: '<command_name>',
  requiredPermissions: 'ADMINISTRATOR',
  global: true
}
