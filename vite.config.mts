import react from "@vitejs/plugin-react";
import crypto from "node:crypto";
import path from "node:path";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  css: {
    modules: { generateScopedName: createGenerateScopedName() },
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  plugins: [react(), UnoCSS()],
});

/**
 * Generate scoped name for CSS modules
 */
export function createGenerateScopedName() {
  /**
   * Cached CSS file hash
   */
  const cachedCSSHash = new Map<string, string>();

  function getCSSHash(fileName: string, css: string): string {
    let hash = cachedCSSHash.get(fileName);
    if (!hash) {
      hash = crypto.createHash("md5").update(css).digest("hex").slice(0, 5);
      cachedCSSHash.set(fileName, hash);
    }
    return hash;
  }

  return function generateScopedName(className: string, fileName: string, css: string): string {
    const moduleName = path.basename(fileName).split(".")[0];
    const hash = getCSSHash(fileName, css);
    return `${moduleName}_${className}_${hash}`;
  };
}
