import { Client, Intents } from 'discord.js'
import Debug from 'debug'
import config from '@/libs/config'

const debug = Debug('app:bot')

const client = new Client({
  intents: Intents.FLAGS.GUILDS
})

client.once('ready', () => {
  debug('TimmyBot ready')
})

client.login(config.discordToken)
