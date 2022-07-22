import { Command } from 'commander'
import generateFunction, { Schematic } from './functions'

export interface GenerateOptions {
  P: string
}

const striveGenerate = (program: Command) =>
  program
    .command('generate [schematic] [name]')
    .alias('g')
    .description('Generate specified schematics')
    .option(
      '--pages, -p <pages>',
      'specify pages to be generated, used along module schematic'
    )
    .option('--ssr', 'generate ssr function for module schematics')
    .action((schematic: Schematic, name: string, options: GenerateOptions) => {
      if (schematic === 'module' && options.P === undefined) {
        throw new Error('You must provide -p flag to generate modules')
      }

      return generateFunction(schematic, name.toLowerCase(), options)
    })

export default striveGenerate
