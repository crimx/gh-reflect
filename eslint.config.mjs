import wopjs, { defineConfig } from "@wopjs/eslint-config";

export default defineConfig(...wopjs, {
  ignores: [".storybook/public/mockServiceWorker.js"],
});
