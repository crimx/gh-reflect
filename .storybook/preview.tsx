import "virtual:uno.css";
import "../src/index.scss";

import { BaseStyles, ThemeProvider, useTheme } from "@primer/react";
import { type Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import React, { useLayoutEffect } from "react";

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize({
  onUnhandledRequest: "bypass",
});

const preview: Preview = {
  decorators: [
    (Story, context) => {
      return (
        <ThemeProvider colorMode={context.globals.colorMode}>
          <BaseStyles>
            <UpdateBodyColorMode />
            {Story()}
          </BaseStyles>
        </ThemeProvider>
      );
    },
  ],
  globalTypes: {
    colorMode: {
      defaultValue: "auto",
      description: "GitHub Primer Color Mode",
      name: "Primer Color Mode",
      toolbar: {
        icon: "paintbrush",
        items: ["auto", "day", "night"],
      },
    },
  },
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

function UpdateBodyColorMode() {
  const theme = useTheme();
  useLayoutEffect(() => {
    document.documentElement.style.backgroundColor = theme.resolvedColorMode === "night" ? "#0d1117" : "#ffffff";
  }, [theme.resolvedColorMode]);
  return null;
}
