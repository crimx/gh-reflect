import { Link } from "@primer/react";
import { type PropsWithChildren, type ReactNode } from "react";

export const RepoSubList = {
  List: ({ children }: PropsWithChildren) => <ul className="list-none p-0 m-0">{children}</ul>,
  RepoItem: ({ title, children }: PropsWithChildren<{ title: ReactNode }>) => (
    <li className="mb-2">
      <div>{title}</div>
      <ul className="list-none p-0 pl-1">{children}</ul>
    </li>
  ),
  SubItem: ({ icon, href, children }: PropsWithChildren<{ icon: ReactNode; href: string }>) => (
    <li className="my-1 flex flex-nowrap">
      <span className="mt-[1px] mr-2">{icon}</span>
      <Link className="text-[var(--fgColor-default)] hover:color-[var(--fgColor-accent)]" href={href} target="_blank">
        {children}
      </Link>
    </li>
  ),
};
