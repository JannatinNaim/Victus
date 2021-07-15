// Import Client for IntelliCode.
// eslint-disable-next-line no-unused-vars
const { Client } = require('discord.js')

const { globalCommandPrefix } = require('../settings.json')

/**
 * Register Commands Globally.
 * @param { Client } discordClient
 * @param { Array } commands
 */
const registerGlobalCommands = async (discordClient, commands) => {
  commands.forEach((command) => {
    if (!command.global) return

    if (!discordClient.settings.commandPrefix) {
      discordClient.settings.commandPrefix = globalCommandPrefix
    }

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

    const commandID = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)

    aliases = [name, ...aliases]

    aliases.forEach(async (alias) => {
      discordClient.commands.set(alias, {
        name,
        run,
        description,
        minArgs,
        maxArgs,
        expectedArgs,
        requiredPermissions,
        commandID
      })
    })

    console.log(`Registered Global Command : ${name}`)
  })
}

/**
 * Register Commands for each Guild.
 * @param { Client } discordClient
 * @param { Array } commands
 */
const registerGuildCommands = async (discordClient, commands) => {
  discordClient.guilds.cache.forEach(async (guild) => {
    if (!guild.settings.commandPrefix) {
      guild.settings.commandPrefix = globalCommandPrefix
    }

    commands.forEach(async (command) => {
      if (command.global) return

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

      const commandID = Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)

      aliases = [name, ...aliases]

      aliases.forEach(async (alias) => {
        guild.commands.set(alias, {
          name,
          run,
          description,
          minArgs,
          maxArgs,
          expectedArgs,
          requiredPermissions,
          commandID
        })
      })

      console.log(`Registered Guild Command : ${name} / ${guild.name}`)
    })
  })
}

module.exports = { registerGlobalCommands, registerGuildCommands }
