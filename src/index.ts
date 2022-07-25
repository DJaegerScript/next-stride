#!/usr/bin/env node

import kleur from 'kleur'
import { Command } from 'commander'

// @ts-ignore
import { version } from '../package.json'
import striveInit from './initialization'
import striveGenerate from './generate'

const main = () => {
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
    striveGenerate(program)

    program.showHelpAfterError().parse()
  } catch (error: any) {
    console.error(
      kleur.bold().bgRed().white('ERROR'),
      kleur.bold().red(error.message)
    )
  }
}

main()
