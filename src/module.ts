//
// For importing from JavaScript and setting things up yourself
//

export * from './layouts/layouts.js'
export * from './lib/lib.js'

import { layoutCustomElements } from './layouts/layouts.js'

/**
  A map of all Custom Elements provided by alembic.
  Keys are the desired names of the element and values are the Custom Elements themselves.

  ```js
  import { allCustomElements } from '@openlab/alembic'
  ```
*/
export const allCustomElements = new Map([...layoutCustomElements])
