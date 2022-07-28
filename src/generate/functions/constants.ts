import generateContext from './generateContext'
import generateElement from './generateElement'
import generateHook from './generateHook'
import generateModule from './generateModule'
import generateSSR from './generateSSR'
import generateUtil from './generateUtil'

export interface Commons {
  components: string
  name: string
  fileType: string
}

interface SchematicFunction {
  [index: string]: (common: Commons, options?: any) => void
}

export const schematics: SchematicFunction = {
  context: generateContext,
  element: generateElement,
  util: generateUtil,
  hook: generateHook,
  module: generateModule,
  ssr: generateSSR,
}
