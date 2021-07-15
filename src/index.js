require('dotenv').config()
const { Client, Collection } = require('discord.js')

const loadFiles = require('./functions/loadFiles.js')

const {
  registerGlobalCommands,
  registerGuildCommands
} = require('./functions/register.js')
const { handleCommands } = require('./functions/handle.js')

const discordClient = new Client({
  messageCacheMaxSize: -1,
  messageCacheLifetime: 60 * 15,
  messageSweepInterval: 60 * 15
})

discordClient.once('ready', async () => {
  console.log('Starting tasks...')

  discordClient.settings = new Collection()
  discordClient.commands = new Collection()
  discordClient.guilds.cache.forEach(guild => {
    guild.commands = new Collection()
    guild.settings = new Collection()
  })

  const commands = await loadFiles('../commands')
  await registerGlobalCommands(discordClient, commands)
  await registerGuildCommands(discordClient, commands)

  handleCommands(discordClient)

  console.log(`Ready! Logged in as ${discordClient.user.tag}`)
})

discordClient.login(process.env.BOT_TOKEN)
