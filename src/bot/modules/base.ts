import { Interaction } from 'discord.js'

export default interface ModuleBase {
  readonly moduleName: string
  
  commands: Map<String, String>
}
