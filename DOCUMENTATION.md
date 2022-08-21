# Project Structure & Schematics

Next Stride scaffold your Next.js directory into three main directories inside the src directory and some configuration file in the root of the project directory. Each time schematic is generated, its interface and the constant file will also be generated.

## Project Structure

```
Next-Project
│   .eslintignore
│   .eslintrc.json
│   .prettierignore
│   .prettierrc
│   ...
│
└───.husky
│   │   pre-commit     
│   
└───src
    │
    └───pages
    │
    └───styles
    │
    └───components
        │   index.ts
        │
        └───contexts
        │   │   index.ts 
        │   
        └───elements
        │   │   index.ts 
        │   
        └───hooks
        │   │   index.ts 
        │   
        └───modules
        │   │   index.ts 
        │   
        └───ssr
        │   │   index.ts 
        │   
        └───utils
            │   index.ts 
```

## Schematics

**1. Contexts**

```bash
stride generate context [name]
```

Contexts is a group of React Context API functions. Stride will generate context schematics along with its boilerplate

```tsx
// src/components/contexts/TestContext/index.tsx
import React, { createContext, useContext } from 'react'
import { props } from './interface'

const TestContext = createContext({} as props) // TODO: Declare interface of contextValue

export const useTestContext = () => useContext(TestContext)

export const TestContextProvider: React.FC = () => {
  // TODO: Write context's logic

  const contextValue = {}

  return <TestContext.Provider value={contextValue}></TestContext.Provider>
}
```

**2. Elements**

```bash
stride generate element [name]
```

Elements is a schematic that is used to generate boilerplate to be used by reusable components.

```tsx
// src/components/elements/TestElement/index.tsx
import React from 'react'

export const TestElement: React.FC = () => {
  // TODO: Write element's logic

  return <></>
}
```

Sometimes, there is an element that need to have a proper naming when it's gonna be used, but can't be achieved when you declaring it. In that case, Next Stride provides element alias with `--as` option.

```bash
stride generate element [name] --as [alias]
```

It will generate an element with the given `name`, but it will be registered as the given `alias`

```tsx
// src/components/elements/SubtestElement/index.tsx
import React from 'react'

const SubtestElement: React.FC = () => {
  // TODO: Write element's logic

  return <></>
}

export default SubtestElement
```

```ts
// src/components/elements/index.ts
export { default as AliasElement } from './SubtestElement'
```

**3. Hooks**

```bash
stride generate hook [name]
```

To manage a state in a smaller scope than context, usually, it needs a custom hook. Next Stride provides a schematic that will generate a boilerplate to manage the custom hooks.

```tsx
// src/components/hooks/useTest/index.ts
export const useTest = () => {
  // TODO: Write element's logic
}
```

**4. Icons**

```bash
stride generate icon [name]
```

Using a long syntax `next-image` or `img` HTML tag only to use the SVG icon can be so much pain. So, Next Stride provides the icon schematic to store and manage custom SVG icons. Also, because the icons stored in the icon schematic are considered a component, it can be very customizable by providing it with a custom `className`.

```tsx
// src/components/icons/TestIcon.tsx
import React from 'react'
import { IconProps } from './interface'

export const TestIcon: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag or in one of its children
  return <svg></svg>
}
```

**5. Modules**

```bash
stride generate module [name]
```

Next Stride expected to let anyone create a concise source code of page files. So, it provides module schematic that let anyone write the page's logic and HTML structure.

```tsx
import React from 'react'

export const TestModule: React.FC = () => {
  // TODO: Write module's logic

  return <></>
}
```

By default, it will also generate its page file in the root of `pages` directory.

```tsx
import React from 'react'
import { TestModule } from '@modules'
import type { NextPage } from 'next'

const Test: NextPage = () => <TestModule />

export default Test
```

But, anyone is not limited to specifying a custom pages directory location by using `--pages` option.

```bash
stride generate module [name] --pages [custom-pages-directory]
```

Also, Next Stride allows anyone to generate the module schematic without it page file by using `--no-page` option.

```bash
stride generate module [name] --no-page
```

Sometimes, pages may be using SSR method to load its page. So, Next Stride provides `--ssr` option to generate the page and module along with its SSR function.

```bash
stride generate module [name] --ssr
```

**6. SSR**

```bash
stride generate ssr [name]
```

Next Stride also provides a stand-alone command to generate SSR schematic.

```ts
import type { GetServerSideProps } from 'next'

export const getTestProps: GetServerSideProps = async (context) => {
  // TODO: Write ssr's logic
  return {
    props: {
      // TODO: Write returned ssr's data
    },
  }
}
```

**7. Utils**

```bash
stride generate util [name]
```

In any development, sometimes, anyone may find many functions that help in doing some repetitive tasks. But, those functions are not categorized or become miscellaneous functions. Next Stride considered this as util schematic.

```ts
export const getTest = () => {
  // TODO: Write Util's logic
}
```
