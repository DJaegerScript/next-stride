export interface OptionInterface {
  interface: boolean
  constant: boolean
  complementary: boolean
  as: string
  P: string
  ssr: boolean
  page: boolean
}

export interface CommonInterface {
  components: string
  name: string
  fileType: string
}

export interface SchematicFunction {
  [index: string]: (common: CommonInterface, options?: any) => void
}

export interface PageProps {
  pagePath: string
  moduleName: string
  SSRName: string | null
}
