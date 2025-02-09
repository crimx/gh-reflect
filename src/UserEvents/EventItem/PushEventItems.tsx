import { GitCommitIcon, RepoPushIcon } from "@primer/octicons-react";
import { Link } from "@primer/react";
import { plural } from "#utils";
import { memo, useMemo } from "react";

import { type PushEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";
import { RepoSubList } from "./RepoSubList";

export interface PushEventItemsProps {
  events: PushEvent[];
}

export const PushEventItems = /* @__PURE__ */ memo<PushEventItemsProps>(function PushEventItems({ events }) {
  const { commitsTotal, repos } = useMemo(() => {
    const reposMap = new Map<string, { commits: number; events: PushEvent[]; name: string; url: string }>();
    for (const event of events) {
      let repo = reposMap.get(event.repo.name);
      if (!repo) {
        reposMap.set(
          event.repo.name,
          (repo = { commits: 0, events: [], name: event.repo.name, url: `https://github.com/${event.repo.name}` }),
        );
      }
      repo.commits += event.payload.size;
      repo.events.push(event);
    }
    const repos = [...reposMap.values()].sort((a, b) => b.commits - a.commits);
    const commitsTotal = repos.reduce((sum, { commits }) => sum + commits, 0);
    return { commitsTotal, repos };
  }, [events]);
  return (
    <EventItemLayout
      head={`Pushed ${plural(commitsTotal, "commit")} to ${plural(repos.length, "repository")}`}
      icon={<RepoPushIcon />}
    >
      <RepoSubList.List>
        {repos.map(({ commits, events, name, url }) => (
          <RepoSubList.RepoItem
            key={name}
            title={
              <>
                <Link className="mr-2" href={url} target="_blank">
                  {name}
                </Link>
                {commits > 1 && `${commits} commits`}
              </>
            }
          >
            {events.map(event =>
              event.payload.commits.map(commit => (
                <RepoSubList.SubItem
                  key={commit.sha}
                  icon={<GitCommitIcon className="text-color-[var(--fgColor-done)]" />}
                  href={`https://github.com/${event.repo.name}/commit/${commit.sha}`}
                >
                  {commit.message.replace(/\n[\s\S]*$/, "")}
                </RepoSubList.SubItem>
              )),
            )}
          </RepoSubList.RepoItem>
        ))}
      </RepoSubList.List>
    </EventItemLayout>
  );
});
