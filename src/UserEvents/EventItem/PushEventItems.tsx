import { GitCommitIcon, RepoIcon, RepoPushIcon } from "@primer/octicons-react";
import { Link } from "@primer/react";
import { useMemo } from "react";

import { type PushEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";

export interface PushEventItemsProps {
  events: PushEvent[];
}

export const PushEventItems = ({ events }: PushEventItemsProps) => {
  const { commits, counts, repos } = useMemo(() => {
    const countsMap = new Map<string, { commits: number; events: PushEvent[]; repo: string; url: string }>();
    for (const event of events) {
      let count = countsMap.get(event.repo.name);
      if (!count) {
        countsMap.set(
          event.repo.name,
          (count = { commits: 0, events: [], repo: event.repo.name, url: event.repo.url }),
        );
      }
      count.commits += event.payload.size;
      count.events.push(event);
    }
    const counts = [...countsMap.values()].sort((a, b) => a.commits - b.commits);
    const repos = countsMap.size;
    const commits = counts.reduce((sum, { commits }) => sum + commits, 0);
    return { commits, counts, repos };
  }, [events]);
  return (
    <EventItemLayout
      head={
        <>
          Pushed {commits} commits to {repos} repos
        </>
      }
      icon={<RepoPushIcon />}
    >
      <ul className="list-none p-0">
        {counts.map(({ commits, events, repo, url }) => (
          <li className="my-1" key={repo}>
            <div>
              <Link className="mr-2" href={url} target="_blank">
                <RepoIcon /> {repo}
              </Link>
              {commits} commits
            </div>
            <ul className="list-none p-0 pl-5">
              {events.map(event =>
                event.payload.commits.map(commit => (
                  <li className="py-1 flex flex-nowrap" key={commit.sha}>
                    <GitCommitIcon className="mt-1 mr-2 text-color-[var(--fgColor-done)]" />
                    <Link href={commit.url} muted target="_blank">
                      {commit.message.replace(/\n[\s\S]*$/, "")}
                    </Link>
                  </li>
                )),
              )}
            </ul>
          </li>
        ))}
      </ul>
    </EventItemLayout>
  );
};
