import { Command } from 'commander'
import generateFunction from './functions'

const striveGenerate = (program: Command) =>
  program
    .command('generate [schematic] [name]')
    .alias('g')
    .description('Generate specified schematics')
    .action((schematic: string, name: string) =>
      generateFunction(schematic, name.toLowerCase())
    )

export default striveGenerate
