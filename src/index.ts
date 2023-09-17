#!/usr/bin/env node

import kleur from 'kleur'
import { Command } from 'commander'

// @ts-ignore
import { version } from '../package.json'
import strideInit from './initialization'
import strideGenerate from './generate'
import strideClean from './clean'

const main = () => {
  const program = new Command()
  try {
    program
      .name('stride')
      .usage('<command>')
      .description('CLI tools for Next JS App 🚀')
      .version(`next-stride@${version}`, '-v, --version')

    strideInit(program)
    strideGenerate(program)
    strideClean(program)

    program.showHelpAfterError().parse()
  } catch (error: any) {
    console.error('❌', kleur.bold().red(error.message))
  }
}

main()
