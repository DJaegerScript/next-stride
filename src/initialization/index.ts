import { Command } from 'commander'
import initFunction from './functions'

const strideInit = (program: Command) =>
  program
    .command('init')
    .description('Initialize stride scaffolding')
    .action(initFunction)

export default strideInit
