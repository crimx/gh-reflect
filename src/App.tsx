import { BaseStyles, SplitPageLayout, ThemeProvider } from "@primer/react";

import { Config } from "./Config";
import { Content } from "./Content";
import { Header } from "./Header";
import { useLocalStorage } from "./useLocalStorage";
import { useEvents } from "./UserEvents";

export function App() {
  const [colorMode] = useLocalStorage<"auto" | "day" | "night">("gh-reflect.colorMode", "auto");
  const [setOptions, status$] = useEvents();
  return (
    <ThemeProvider colorMode={colorMode}>
      <BaseStyles>
        <SplitPageLayout>
          <SplitPageLayout.Header className="position-sticky top-0 bg-[var(--bgColor-default)] z-1" padding="condensed">
            <Header />
          </SplitPageLayout.Header>
          <SplitPageLayout.Content className="z-0 [&>div]:p-0 min-h-[var(--sticky-pane-height)]">
            <Content status$={status$} />
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
      </BaseStyles>
    </ThemeProvider>
  );
}
