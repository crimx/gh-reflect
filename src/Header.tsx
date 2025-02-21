import { MarkGithubIcon } from "@primer/octicons-react";
import { Box, Link } from "@primer/react";
import { memo } from "react";

import { ColorModeSelect } from "./ColorModeSelect";

export const Header = /* @__PURE__ */ memo(function Header() {
  return (
    <div className="flex flex-items-center">
      <Link
        className="text-inherit hover:color-[--fgColor-accent] flex flex-items-center gap-4 text-base font-bold"
        href="https://github.com/crimx/gh-reflect"
        target="_blank"
      >
        <MarkGithubIcon size={24} /> GitHub Reflect
      </Link>
      <Box className="ml-auto">
        <ColorModeSelect />
      </Box>
    </div>
  );
});
