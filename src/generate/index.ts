import { Command } from 'commander'
import generateFunction, { Schematic } from './functions'

export interface GenerateOptions {
  P: string
}

const strideGenerate = (program: Command) =>
  program
    .command('generate [schematic] [name]')
    .alias('g')
    .description('Generate specified stride schematics')
    .option(
      '--pages, -p <pages>',
      'specify pages to be generated, used along module schematic'
    )
    .option('--ssr', 'generate ssr function for module schematics')
    .option('--no-page', 'prevent module schematics to generate pages')
    .option('--as <alias>', 'generate schematics with aliases')
    .action((schematic: Schematic, name: string, options: GenerateOptions) =>
      generateFunction(schematic, name, options)
    )

export default strideGenerate
