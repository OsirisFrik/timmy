import { Interaction } from 'discord.js'

export interface Command {
  cmd: string
  description: string
  action: any
}

export interface ModuleBase {
  readonly moduleName: string
  
  commands: Map<String, Command>
}
