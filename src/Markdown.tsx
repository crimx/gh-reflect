import markdownDark from "@hyrious/github-markdown-css/dist/dark.css?raw";
import markdownLight from "@hyrious/github-markdown-css/dist/light.css?raw";
import syntaxDark from "highlight.js/styles/github-dark.min.css?raw";
import syntaxLight from "highlight.js/styles/github.min.css?raw";

import { useTheme } from "@primer/react";
import { type PropsWithChildren, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const stylesLight = markdownLight + "\n" + syntaxLight;
const stylesDark = markdownDark + "\n" + syntaxDark;

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeHighlight];

export interface MarkdownProps {
  text: string;
}

export const MarkdownThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  useEffect(() => {
    let styleElement = document.getElementById("md-style-el");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "md-style-el";
      document.body.appendChild(styleElement);
    }
    styleElement.textContent = theme.resolvedColorMode === "night" ? stylesDark : stylesLight;
    return () => {
      if (styleElement?.parentElement) {
        document.body.removeChild(styleElement);
      }
    };
  }, [theme.resolvedColorMode]);
  return children;
};

export const Markdown = ({ text }: MarkdownProps) => {
  return (
    <ReactMarkdown className="markdown-body" rehypePlugins={rehypePlugins} remarkPlugins={remarkPlugins}>
      {text}
    </ReactMarkdown>
  );
};
