// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
//
// GitHub Pages note: once you create the repo, set `site` to your Pages URL
// (https://<user>.github.io/<repo>) and, if it's a project site (not a
// <user>.github.io root repo), uncomment `base` and set it to `/<repo>`.
export default defineConfig({
  site: 'https://cleverfoxtechsolutions.github.io',
  base: '/portfolio',
  vite: {
    plugins: [tailwindcss()]
  }
});