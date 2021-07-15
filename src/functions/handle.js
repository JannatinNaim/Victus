// Import Client for IntelliCode.
// eslint-disable-next-line no-unused-vars
const { Client } = require('discord.js')

/**
 * Handle Guild Commands
 * @param { Client } discordClient
 */
const handleCommands = async (discordClient) => {
  discordClient.on('message', async (message) => {
    if (message.author.id === discordClient.user.id) return

    const { author, member, content, guild } = message

    const _guild = discordClient.guilds.cache.get(guild.id)
    const { commandPrefix } = _guild.settings

    if (!content.startsWith(commandPrefix)) return

    const args = content.split(/[ ]+/)
    const userCommand = args[0].replace(commandPrefix, '')

    let command

    command = _guild.commands?.get(userCommand)
    if (!command) { command = discordClient.commands?.get(userCommand) }
    if (!command) return
    if (command.disabled) return message.reply('Command Disabled!')

    const {
      global,
      name,
      run,
      minArgs,
      maxArgs,
      expectedArgs,
      requiredPermissions,
      requiredRoles
    } = command

    console.log(`${author} ran command : ${name} in  ${guild.name}.`)

    if (!member.hasPermission(requiredPermissions)) {
      message.reply("You don't have the permissions to run that command.")
      return
    }

    const hasRoles = (role) => member.roles.cache.has(role)
    if (!global && (requiredRoles?.length && !requiredRoles.every(hasRoles))) {
      message.reply("You don't have the roles to run that command.")
      return
    }

    args.shift()
    if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
      message.reply(
        `Incorrect syntax! Use ${commandPrefix}${name} ${expectedArgs}`
      )
      return
    }

    try {
      await run(message, args, discordClient)
    } catch (error) {
      message.reply(error)

      console.error(error)
    }
  })
}

module.exports = { handleCommands }
