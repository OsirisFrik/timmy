import { CommandInteraction } from 'discord.js'
import { Command, ModuleBase } from './base'
import ngrok from 'ngrok'
import config from '@/libs/config'

export default class MinecraftModule implements ModuleBase {
  readonly moduleName: string = 'MinecraftModule'
  commands: Map<string, Command> = new Map()
  server: string | null = null

  constructor() {
   this.commands.set('mchost', {
     cmd: 'mchost',
     description: 'get minecraft host server',
     action: (interaction: CommandInteraction) => this.mcHost(interaction)
   })
    .set('mcstophost', {
      cmd: 'mcstophost',
      description: 'stop server host',
      action: (interaction: CommandInteraction) => this.stopHost(interaction)
    })
  }

  async mcHost(interaction: CommandInteraction) {
    if (!this.server) await this.startSever()

    const reply = this.server!.replace('tcp://', '')

    interaction.reply(`Server host in \`${reply}\``)
  }

  async stopHost(interaction: CommandInteraction) {
    if (this.server) await ngrok.disconnect(this.server)

    interaction.reply('Server host has stopped')
  }

  async startSever() {
    this.server = await ngrok.connect({
      proto: 'tcp',
      addr: 25565,
      authtoken: config.ngrokToken
    })
  }
}
