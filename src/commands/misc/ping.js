// Import Client for IntelliCode.
// eslint-disable-next-line no-unused-vars
const { Message } = require('discord.js')

module.exports = {
  name: 'ping',
  global: true,
  /**
   * @param { Message} message
   */
  run: async (message) => {
    message.reply('Pong!')
  }
}
