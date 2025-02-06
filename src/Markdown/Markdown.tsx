import "./styles/gfm.light.scss";
import "./styles/gfm.dark.scss";
import "./styles/hljs.github.light.scss";
import "./styles/hljs.github.dark.scss";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeHighlight];

export interface MarkdownProps {
  text: string;
}

export const Markdown = ({ text }: MarkdownProps) => {
  return (
    <ReactMarkdown className="gfm-body" rehypePlugins={rehypePlugins} remarkPlugins={remarkPlugins}>
      {text}
    </ReactMarkdown>
  );
};
