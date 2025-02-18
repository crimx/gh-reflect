import { defineConfig, presetIcons, presetWind, presetMini } from "unocss";

export default defineConfig({
  presets: [
    presetMini(),
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
