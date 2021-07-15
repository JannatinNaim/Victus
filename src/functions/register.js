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

    let { name, aliases = [] } = command
    aliases = [name, ...aliases]

    aliases.forEach(async (alias) => {
      discordClient.commands.set(alias, command)
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
      let { name, aliases = [] } = command
      aliases = [name, ...aliases]

      aliases.forEach(async (alias) => {
        guild.commands.set(alias, command)
      })

      console.log(`Registered Guild Command : ${name} / ${guild.name}`)
    })
  })
}

module.exports = { registerGlobalCommands, registerGuildCommands }
