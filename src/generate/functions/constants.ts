import generateContext from './generateContext'
import generateElement from './generateElement'
import generateHook from './generateHook'
import generateModule from './generateModule'
import generateUtil from './generateUtil'

interface SchematicFunction {
  [index: string]: (
    components: string,
    name: string,
    fileType: string,
    options?: any
  ) => void
}

export const schematics: SchematicFunction = {
  context: generateContext,
  element: generateElement,
  util: generateUtil,
  hook: generateHook,
  module: generateModule,
}
