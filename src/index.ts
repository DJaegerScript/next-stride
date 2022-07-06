#!/usr/bin/env node

import kleur from 'kleur'
import { Command } from 'commander'

// @ts-ignore
import { version } from '../package.json'
import striveInit from './initialization'

const main = (argv: string[]) => {
  const program = new Command()
  try {
    program
      .name('strive')
      .usage('<command>')
      .description(
        'CLI to generate well-structured next.js folder architecture'
      )
      .version(`next-strive@${version}`, '-v, --version')

    striveInit(program)

    program.showHelpAfterError().parse()

    // const limit = options.first ? 1 : undefined
    // console.log(program.args[0].split(options.separator, limit))
    // striveInit()
  } catch (error: any) {
    console.error(
      kleur.bold().bgRed().yellow('ERROR'),
      kleur.bold().red(error.message)
    )
  }
}

main(process.argv)
