import { Client, CommandInteraction, Intents } from 'discord.js'
import Debug from 'debug'
import config from '@/libs/config'
import modules from './modules'
import { Command } from './modules/base'

const debug = Debug('app:bot')

const client = new Client({
  intents: Intents.FLAGS.GUILDS
})
let commands: Map<string, Command>

client.once('ready', async () => {
  debug('TimmyBot ready')

  const guilds = client.guilds.cache

  commands = await modules(guilds.toJSON())
})

client.login(config.discordToken)
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const { commandName } = interaction

  if (!commands.has(commandName)) return

  const command = commands.get(commandName)

  try {
    command?.action(interaction)
  } catch (err) {
    interaction.reply(
      'I don\'t know whats happened'
    )
  }
})

export default client
