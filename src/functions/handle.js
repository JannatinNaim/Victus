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

    const { author, content, guild } = message

    const _guild = discordClient.guilds.cache.get(guild.id)
    const { commandPrefix } = _guild.settings

    if (!content.startsWith(commandPrefix)) return

    const args = content.split(/[ ]+/)
    const userCommand = args[0].replace(commandPrefix, '')

    let command

    command = _guild.commands?.get(userCommand)
    if (!command) { command = discordClient.commands?.get(userCommand) }
    if (!command) return

    const {
      name,
      run,
      minArgs,
      maxArgs,
      expectedArgs
    } = command

    console.log(`${author} ran command : ${name} in  ${guild.name}.`)

    args.shift()
    if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
      message.reply(
        `Incorrect syntax! Use ${commandPrefix}${name} ${expectedArgs}`
      )
      return
    }

    await run(message, args, discordClient)
  })
}

module.exports = { handleCommands }
