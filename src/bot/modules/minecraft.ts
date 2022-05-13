import { Interaction } from 'discord.js'
import ModuleBase from './base'
import ngrok from 'ngrok'
import config from '@/libs/config'

export default class MinecraftModule implements ModuleBase {
  readonly moduleName: string = 'MinecraftModule'
  commands: Map<String, String> = new Map()
  server: string | null = null

  constructor() {
    const commands: string[] = []

    for (const command of commands) {
      this.commands.set(command, command)
    }
  }

  mcHost(interaction: Interaction) {

  }

  async startSever() {
    this.server = await ngrok.connect({
      proto: 'tcp',
      addr: 25565,
      authtoken: config.ngrokToken
    })
  }
}
