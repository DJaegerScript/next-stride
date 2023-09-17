import { Command } from 'commander'
import generateFunction from './functions'
import { OptionInterface, Schematic } from './functions/interface'

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
    .option('--no-page', 'prevent module schematic to generate pages')
    .option('--as <alias>', 'generate element schematic with aliases')
    .option(
      '--no-interface',
      'prevent stride to generate interface declaration file'
    )
    .option(
      '--no-constant',
      'prevent stride to generate constant declaration file'
    )
    .option(
      '--no-complementary',
      'prevent stride to generate both interface and constant declaration file'
    )
    .action((schematic: Schematic, name: string, options: OptionInterface) =>
      generateFunction(schematic, name, options)
    )

export default strideGenerate
