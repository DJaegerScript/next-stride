import { Command } from 'commander'
import cleanFunction from './functions'

const strideClean = (program: Command) =>
  program
    .command('clean')
    .description('Clean unused complementary files')
    .action(() => cleanFunction())

export default strideClean
