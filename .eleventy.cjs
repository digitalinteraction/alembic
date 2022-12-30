const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const cp = require('child_process')
const path = require('path')

const pkg = require('./package.json')
const site = require('./src/_data/site.json')

// Load after initial build (which builds the plugin)
cp.execFileSync(path.join(__dirname, 'bin/build.sh'))
const { eleventyAlembic } = require('@openlab/alembic/11ty')

/** @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyAlembic)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.on('eleventy.before', () => {
    console.debug('Rebuilding lib')
    cp.execFileSync(path.join(__dirname, 'bin/build.sh'))
  })

  eleventyConfig.addFilter('apiSort', (items) => {
    return Array.from(items).sort((a, b) =>
      b.data.title.localeCompare(a.data.title)
    )
  })
  eleventyConfig.addFilter('fullUrl', (path) => {
    return new URL(path, site.url).href
  })

  eleventyConfig.addShortcode('pkgVersion', () => pkg.version)

  eleventyConfig.addWatchTarget('./src/**/*.css')
  eleventyConfig.addWatchTarget('./src/**/*.ts')

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['html', 'md'],
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}
