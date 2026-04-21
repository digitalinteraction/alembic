import { EleventyRenderPlugin, IdAttributePlugin } from "@11ty/eleventy";

import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import eleventyAlembic from "@openlab/alembic/11ty.js";
import eleventyNavigation from "@11ty/eleventy-navigation";
import slugify from "slugify";

import pkg from "./package.json" with { type: "json" };
import site from "./source/_data/site.json" with { type: "json" };
import { buildLibrary } from "./scripts/build-library.js";

/** @param {import('@11ty/eleventy/UserConfig').default} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true); // TODO: remove for eleventy@4

  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(eleventyAlembic);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyNavigation);

  eleventyConfig.addFilter("fullUrl", (path) => {
    return new URL(path, site.url).href;
  });
  eleventyConfig.addFilter("isCurrentPage", (pageUrl, currentUrl) => {
    return currentUrl.startsWith(pageUrl);
  });

  eleventyConfig.addShortcode("pkgVersion", () => pkg.version);
  eleventyConfig.addPairedShortcode(
    "error",
    (content) => `<p class="eleventyError">${content}</p>`,
  );

  eleventyConfig.on("eleventy.before", async () => {
    await buildLibrary({ lint: false });
  });

  // TODO: add watch/rebuild for src in development mode?
  eleventyConfig.addWatchTarget("./source/**/*.css");
  eleventyConfig.addWatchTarget("./source/**/*.ts");
}

export const config = {
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  templateFormats: ["html", "md"],
  dir: {
    input: "source",
    output: "dist",
    layouts: "_layouts",
  },
};
