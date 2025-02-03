import { MoonIcon, SunIcon } from "@primer/octicons-react";
import { ActionList, ActionMenu, useTheme } from "@primer/react";
import { memo, useLayoutEffect } from "react";

import { setLocalStorageItem } from "./useLocalStorage";

export const ColorModeSelect = /* @__PURE__ */ memo(function ColorModeSelect() {
  const theme = useTheme();
  useLayoutEffect(() => {
    document.documentElement.style.backgroundColor = theme.resolvedColorMode === "night" ? "#0d1117" : "#ffffff";
  }, [theme.resolvedColorMode]);

  const setColorMode = (colorMode: "auto" | "day" | "night") => {
    theme.setColorMode(colorMode);
    setLocalStorageItem("gh-reflect.colorMode", colorMode);
  };

  return (
    <ActionMenu>
      <ActionMenu.Button leadingVisual={theme.resolvedColorMode === "day" ? <SunIcon /> : <MoonIcon />}>
        {theme.colorMode === "night" ? "Dark" : theme.colorMode === "day" ? "Light" : "Auto"}
      </ActionMenu.Button>
      <ActionMenu.Overlay>
        <ActionList selectionVariant="single">
          <ActionList.Item onSelect={() => setColorMode("auto")} selected={theme.colorMode === "auto"}>
            Auto
          </ActionList.Item>
          <ActionList.Item onSelect={() => setColorMode("day")} selected={theme.colorMode === "day"}>
            Light
          </ActionList.Item>
          <ActionList.Item onSelect={() => setColorMode("night")} selected={theme.colorMode === "night"}>
            Dark
          </ActionList.Item>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
});
