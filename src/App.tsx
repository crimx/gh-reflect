import { BaseStyles, SplitPageLayout, ThemeProvider } from "@primer/react";

import { Config } from "./Config";
import { Header } from "./Header";
import { MarkdownThemeProvider } from "./Markdown";
import { useLocalStorage } from "./useLocalStorage";
import { UserEvents } from "./UserEvents/UserEvents";
import { useEvents } from "./UserEvents/useUserEvents";

export function App() {
  const [colorMode] = useLocalStorage<"auto" | "day" | "night">("gh-reflect.colorMode", "auto");
  const [status$, setOptions] = useEvents();
  return (
    <ThemeProvider colorMode={colorMode}>
      <BaseStyles>
        <MarkdownThemeProvider>
          <SplitPageLayout>
            <SplitPageLayout.Header
              className="position-sticky top-0 bg-[var(--bgColor-default)] z-100"
              padding="condensed"
            >
              <Header />
            </SplitPageLayout.Header>
            <SplitPageLayout.Content className="[&>div]:p-0 min-h-[var(--sticky-pane-height)]">
              <UserEvents status$={status$} />
            </SplitPageLayout.Content>
            <SplitPageLayout.Pane
              offsetHeader={64}
              position={{ narrow: "start", regular: "end", wide: "end" }}
              resizable
              width="large"
            >
              <Config onSubmit={setOptions} />
            </SplitPageLayout.Pane>
          </SplitPageLayout>
        </MarkdownThemeProvider>
      </BaseStyles>
    </ThemeProvider>
  );
}
