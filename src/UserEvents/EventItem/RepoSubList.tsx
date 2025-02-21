import { FoldIcon, UnfoldIcon } from "@primer/octicons-react";
import { Link } from "@primer/react";
import { useState, type PropsWithChildren, type ReactNode } from "react";

export const RepoSubList = {
  List: ({ children }: PropsWithChildren) => <ul className="list-none p-0 m-0">{children}</ul>,
  RepoItem: ({ title, children }: PropsWithChildren<{ title: ReactNode }>) => (
    <li className="mb-2">
      <div className="p-1 hover:bg-[--bgColor-muted] focus-within:bg-[--bgColor-muted]">{title}</div>
      <ul className="list-none p-0 m-0 pl-1">{children}</ul>
    </li>
  ),
  RepoItemExpandable: ({ title, children }: { title: ReactNode; children: () => ReactNode }) => {
    const [expanded, setExpand] = useState(false);
    return (
      <li>
        <button
          className="btn p-1 w-full text-left flex flex-nowrap items-center overflow-hidden hover:bg-[--bgColor-muted] focus:bg-[--bgColor-muted] focus-within:bg-[--bgColor-muted]"
          onClick={e => {
            if (!(e.target as Element).closest?.("a")) {
              setExpand(expanded => !expanded);
            }
          }}
        >
          {title}
          {expanded ? <FoldIcon className="ml-auto" /> : <UnfoldIcon className="ml-auto" />}
        </button>
        {expanded && <ul className="list-none p-0 m-0 pl-1">{children()}</ul>}
      </li>
    );
  },
  SubItem: ({ icon, href, date, children }: PropsWithChildren<{ icon: ReactNode; date?: string; href?: string }>) => (
    <li className="p-[2px] flex flex-nowrap hover:bg-[--bgColor-muted] focus-within:bg-[--bgColor-muted]">
      <span className="mt-[1px] mr-2">{icon}</span>
      {href ? (
        <Link className="text-[--fgColor-default] hover:color-[--fgColor-accent]" href={href} target="_blank">
          {children}
        </Link>
      ) : (
        children
      )}
      {date && (
        <span className="ml-auto">
          <span className="ml-1 mt-1 color-[--fgColor-muted] text-xs whitespace-nowrap">
            {new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
          </span>
        </span>
      )}
    </li>
  ),
};
