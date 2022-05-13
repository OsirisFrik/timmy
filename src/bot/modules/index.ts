import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import config from '@/libs/config'
import dir from 'require-dir'
import { Command, ModuleBase } from './base'
import Debug from 'debug'
import { Guild } from 'discord.js'

const debug = Debug('app:module')

const modules = dir('./', {
  recurse: true,
  filter: (path: string) => {
    if (path.includes('base')) return false

    return true
  },
  mapValue: (val: any) => val.default ? val.default : val
})

export default async function init(guilds: Guild[]) {
  const commands: Map<string, Command> = new Map()
  const cmds = []

  for (const module of Object.values(modules)) {
    try {
      const moduleObject = new module() as ModuleBase
      const moduleCommands = moduleObject.commands.entries()
      let end = false

      do {
        const command = moduleCommands.next()

        if (command.done && command.value === undefined) {
          end = true
        } else {
          const [ name, cmd ] = command.value as [string, Command]

          cmds.push(
            new SlashCommandBuilder().setName(cmd.cmd).setDescription(cmd.description).toJSON()
          )
          commands.set(cmd.cmd, cmd)
        }
      } while (!end)
    } catch (err) {
      console.trace(err)
    }
  }

  const rest = new REST({ version: '9' }).setToken(config.discordToken as string)

  for (const guild of guilds) {
    try {
      const res = await rest.put(
        Routes.applicationGuildCommands(config.discordId, guild.id),
        {
          body: cmds
        }
      )
  
      console.log(`guild ${guild.name} commands set`)
    } catch (err) {
      console.log(`error on set commands in ${guild.name} guild`)
    }
  }

  return commands
}
