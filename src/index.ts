#!/usr/bin/env node

import kleur from 'kleur'

import striveInit from './initialization'

const main = async (argv: string[]) => {
  try {
    await striveInit()
  } catch (error: any) {
    console.error(
      kleur.bold().bgRed().yellow('ERROR'),
      kleur.bold().red(error.message)
    )
  }
}

main(process.argv)
