//
// For importing from JavaScript and setting things up yourself
//

export * from './layouts/layouts.js'
export * from './lib/lib.js'

import { layoutCustomElements } from './layouts/layouts.js'

export const allCustomElements = new Map([...layoutCustomElements])
