import { defineConfig, presetIcons, presetWind } from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      cdn: "https://esm.sh/",
      extraProperties: {
        cursor: "default",
        "user-select": "none",
      },
    }),
    presetWind({
      arbitraryVariants: false,
      preflight: false,
    }),
  ],
});
