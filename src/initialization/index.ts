import { Command } from 'commander'
import initFunction from './functions'

const striveInit = (program: Command) =>
  program
    .command('init')
    .description('Initialize strive scaffolding')
    .action(() => initFunction())

export default striveInit
