import assert from 'node:assert/strict'
import { describe, it } from 'mocha'

import { trimCss } from './style.js'

describe('trimCss', () => {
  it('remove extra whitespace', () => {
    assert.equal(
      trimCss`p \n {\n\n color:\t\troyalblue; \t}`,
      'p { color: royalblue; }'
    )
  })
})
