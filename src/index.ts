#!/usr/bin/env node

import kleur from 'kleur'

import striveInit from './initialization'

const main = (argv: string[]) => {
  try {
    striveInit()
  } catch (error: any) {
    console.error(
      kleur.bold().bgRed().yellow('ERROR'),
      kleur.bold().red(error.message)
    )
  }
}

main(process.argv)
