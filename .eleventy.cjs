const { EleventyRenderPlugin } = require('@11ty/eleventy')
const markdownIt = require('markdown-it')
const markdownAnchor = require('markdown-it-anchor')

const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const { eleventyAlembic } = require('@openlab/alembic/11ty')
const slugify = require('slugify')

const pkg = require('./package.json')
const site = require('./src/_data/site.json')

// TODO: refactor this out when upgrading to eleventy@2
const md = markdownIt({
  html: true,
})
md.use(markdownAnchor, {
  slugify: (str) => slugify(str, { lower: true, strict: true }),
})
md.disable('code')

// TODO: add watch/rebuild for src in development mode?

/** @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', md)

  eleventyConfig.addPlugin(EleventyRenderPlugin)
  eleventyConfig.addPlugin(eleventyAlembic)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addFilter('apiSort', (items) => {
    return Array.from(items).sort((a, b) =>
      b.data.title.localeCompare(a.data.title)
    )
  })
  eleventyConfig.addFilter('fullUrl', (path) => {
    return new URL(path, site.url).href
  })
  eleventyConfig.addFilter('isCurrentPage', (pageUrl, currentUrl) => {
    return currentUrl.startsWith(pageUrl)
  })
  eleventyConfig.addFilter('md', (content) => {
    // TODO: this seems to have 11ty's syntax added already
    return md.render(content)
  })
  eleventyConfig.addFilter('json', (content) =>
    JSON.stringify(content, null, 2)
  )
  eleventyConfig.addFilter('getPages', (collection, tags = []) => {
    const set = new Set(tags)
    return collection
      .filter((item) => item.data.tags?.some((t) => set.has(t)))
      .sort((a, b) => a.data.title?.localeCompare(b.data.title))
  })
  eleventyConfig.addFilter('slug', (text) => slugify(text))

  eleventyConfig.addShortcode('pkgVersion', () => pkg.version)
  eleventyConfig.addPairedShortcode(
    'error',
    (content) => `<p class="eleventyError">${content}</p>`
  )

  // eleventyConfig.addWatchTarget('./src/**/*.css')
  // eleventyConfig.addWatchTarget('./src/**/*.ts')

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['html', 'md'],
    dir: {
      input: 'src',
      output: 'dist',
      layouts: '_layouts',
    },
  }
}
