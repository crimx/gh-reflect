import { RepoIcon } from "@primer/octicons-react";
import { Link } from "@primer/react";

import { type GitHubEvent } from "../schema.interface";

export interface RepoListProps {
  events: GitHubEvent[];
  lineThrough?: boolean;
}

export const RepoList = ({ events, lineThrough }: RepoListProps) => {
  return (
    <ul className="list-none p-0 m-0">
      {events.map(event => (
        <li className="my-1 hover:bg-[--bgColor-muted] focus-within:bg-[--bgColor-muted]" key={event.repo.name}>
          <RepoIcon />
          <Link
            className={`mr-2 ml-2 ${lineThrough ? "line-through" : ""}`}
            href={`https://github.com/${event.repo.name}`}
            target="_blank"
          >
            {event.repo.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
