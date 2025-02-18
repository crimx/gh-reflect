import "./styles/gfm.light.scss";
import "./styles/gfm.dark.scss";
import "./styles/hljs.github.light.scss";
import "./styles/hljs.github.dark.scss";

import ReactMarkdown, { type Options } from "react-markdown";
import rehypeGitHubEmoji from "rehype-github-emoji";
import rehypeGitHubImage from "rehype-github-image";
import rehypeGitHubLink from "rehype-github-link";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const remarkPlugins: Options["remarkPlugins"] = [remarkGfm];
const rehypePlugins: Options["rehypePlugins"] = [
  [rehypeRaw, { tagfilter: true }],
  rehypeHighlight,
  rehypeGitHubEmoji,
  rehypeGitHubImage,
  rehypeGitHubLink,
  rehypeSanitize,
];

export interface MarkdownProps {
  text: string;
  className?: string;
}

export const Markdown = ({ text, className = "" }: MarkdownProps) => {
  return (
    <ReactMarkdown className={`gfm-body ${className}`} rehypePlugins={rehypePlugins} remarkPlugins={remarkPlugins}>
      {text}
    </ReactMarkdown>
  );
};
