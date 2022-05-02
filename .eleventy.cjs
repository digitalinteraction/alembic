const UserConfig = require('@11ty/eleventy/src/UserConfig')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

/** @param {UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)

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
