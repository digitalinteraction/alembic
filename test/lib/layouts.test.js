import assert from 'node:assert/strict'
import { describe, it } from 'mocha'
import dedent from 'dedent'

import '../../src/lib/fake-dom-env.js'
import {
  _createLayoutStyle,
  _injectLayoutStyles,
  _parseHtmlAttributes,
  injectLayoutStyles,
  _processLayoutMatch,
  _formatHtmlAttributes,
} from '../../src/layouts/layouts.js'

describe('#injectLayoutStyles', () => {
  it('should inject styles into the HTML', () => {
    const result = injectLayoutStyles(
      dedent`
        <!-- @openlab/alembic inject-css -->
        <stack-layout space="10px"></stack-layout>
      `
    )

    assert.match(result, /<style id="StackLayout-10px">/)
    assert.match(
      result,
      /<stack-layout space="10px" data-i="StackLayout-10px">/
    )
  })
})

describe('#_injectLayoutStyles', () => {
  it('should replace the html comment with the value', () => {
    const result = _injectLayoutStyles(
      dedent`
        <p>Hello</p>
        <!-- @openlab/alembic inject-css -->
      `,
      '<style>p{color:red}</style>'
    )

    assert.equal(
      result,
      dedent`
        <p>Hello</p>
        <style>p{color:red}</style>
      `
    )
  })
})

describe('#_createLayoutStyle', () => {
  it('should create a style tag with an id set', () => {
    const result = _createLayoutStyle('id', 'css')
    assert.equal(result, '<style id="id">css</style>')
  })
})

describe('#_parseHtmlAttributes', () => {
  it('should create an object of properties', () => {
    const result = _parseHtmlAttributes('id="myBox" \n space="5px"')
    assert.deepEqual(result, {
      id: 'myBox',
      space: '5px',
    })
  })
})

describe('#_processLayoutMatch', () => {
  it('should inject the layout id', () => {
    const result = _processLayoutMatch('stack-layout', { space: '1rem' })
    assert.equal(
      result.newTag,
      '<stack-layout space="1rem" data-i="StackLayout-1rem">'
    )
  })

  it('should register a style', () => {
    const result = _processLayoutMatch('stack-layout', { space: '1rem' })
    assert.equal(result.id, 'StackLayout-1rem')
    assert.ok(result.css, 'No css generated')
  })

  it('should return null for unknown layouts', () => {
    const result = _processLayoutMatch('bad-layout', { space: '1rem' })
    assert.equal(result, null)
  })
})

describe('#_formatHtmlAttributes', () => {
  it('should form a HTML attribute string', () => {
    const result = _formatHtmlAttributes({ id: 'myCover', space: '1rem' })
    assert.equal(result, 'id="myCover" space="1rem"')
  })
})
