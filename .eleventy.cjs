require('@openlab/alembic/fake-dom-env')

const UserConfig = require('@11ty/eleventy/src/UserConfig')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const { injectLayoutStyles } = require('@openlab/alembic')

/** @param {UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addFilter('apiSort', (items) => {
    return Array.from(items).sort((a, b) =>
      b.data.title.localeCompare(a.data.title)
    )
  })

  eleventyConfig.addTransform('html', (content) => injectLayoutStyles(content))

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
