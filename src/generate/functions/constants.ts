import generateContext from './generateContext'
import generateElement from './generateElement'
import generateHook from './generateHook'
import generateIcon from './generateIcon'
import generateModule from './generateModule'
import generateSSR from './generateSSR'
import generateUtil from './generateUtil'
import { SchematicFunction } from './interface'

export const schematics: SchematicFunction = {
  context: generateContext,
  element: generateElement,
  util: generateUtil,
  hook: generateHook,
  module: generateModule,
  ssr: generateSSR,
  icon: generateIcon,
}
