import {
  _iterateElements,
  _createStyle,
  _recreateElement,
  _parseHtmlAttributes,
  _elementRegex,
  _commentRegex,
} from './tools.js'

import assert from 'node:assert/strict'
import { describe, it } from 'mocha'

const testElements = new Map<string, any>([
  ['cool-button', { getStyles: () => ({ id: 'style_a', css: 'css_a' }) }],
  ['rad-slider', { getStyles: () => ({ id: 'style_b', css: 'css_b' }) }],
])

describe('_iterateElements', () => {
  it('should loop through element matches', () => {
    const html =
      '<cool-button accent="rainbow"> <rad-slider label="Fancy"><cool-button accent="midnight">'
    const result = Array.from(_iterateElements(html, testElements))
    assert.equal(result.length, 3, 'Should match 3 elements')
  })
})

describe('_createStyle', () => {
  it('should return a style tag', () => {
    assert.equal(
      _createStyle('someId', 'p { color: red; }'),
      '<style id="someId">p { color: red; }</style>'
    )
  })
})

describe('_recreateElement', () => {
  it('should return a new element', () => {
    assert.equal(
      _recreateElement(
        'cool-button',
        'data-accent="rainbow"',
        'CoolButtonRainbow'
      ),
      '<cool-button data-accent="rainbow" data-i="CoolButtonRainbow">'
    )
  })
})

describe('_parseHtmlAttributes', () => {
  it('should create an object of properties', () => {
    const result = _parseHtmlAttributes('id="radButton" \n space="5px"')
    assert.deepEqual(result, {
      id: 'radButton',
      space: '5px',
    })
  })
  it('should parse no-value properties', () => {
    const result = _parseHtmlAttributes('noBar')
    assert.deepEqual(result, {
      noBar: true,
    })
  })
  it('should parse kebab-case properties', () => {
    const result = _parseHtmlAttributes('data-accent="astrophage"')
    assert.deepEqual(result, {
      'data-accent': 'astrophage',
    })
  })
})

describe('_elementRegex', () => {
  it('should match the element with attributes', () => {
    const regex = _elementRegex('cool-button')
    assert.match('<cool-button accent="rainbow">', regex)
  })
  it('should match the element and get attributes', () => {
    const regex = _elementRegex('cool-button')
    const match = regex.exec('<cool-button accent="rainbow">')
    assert.equal(match?.[1], 'accent="rainbow"')
  })
})

describe('_commentRegex', () => {
  it('should match a namespaced HTML comment with whitespace', () => {
    const regex = _commentRegex('inject-kickflips')
    assert.match('<!-- @openlab/alembic inject-kickflips -->', regex)
  })
})
