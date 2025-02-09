import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";
import { Link } from "@primer/react";
import { plural } from "#utils";
import { memo, useMemo } from "react";

import { type PullRequestEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";
import { RepoSubList } from "./RepoSubList";

export interface PullRequestEventItemsProps {
  events: PullRequestEvent[];
}

export const PullRequestEventItems = /* @__PURE__ */ memo(function IssueEventItems({
  events,
}: PullRequestEventItemsProps) {
  const { prTotal, repos } = useMemo(() => {
    const reposMap = new Map<string, { events: PullRequestEvent[]; name: string; url: string }>();
    for (const event of events) {
      if (event.payload.action === "opened" || event.payload.action === "reopened") {
        let repo = reposMap.get(event.repo.name);
        if (!repo) {
          reposMap.set(
            event.repo.name,
            (repo = { events: [], name: event.repo.name, url: `https://github.com/${event.repo.name}` }),
          );
        }
        repo.events.push(event);
      }
    }
    const repos = [...reposMap.values()].sort((a, b) => b.events.length - a.events.length);
    const prTotal = repos.reduce((sum, { events }) => sum + events.length, 0);
    return { prTotal, repos };
  }, [events]);

  if (!repos.length) {
    return null;
  }

  return (
    <EventItemLayout
      head={`Opened ${plural(prTotal, "pull request")} in ${plural(repos.length, "repository")}`}
      icon={<GitPullRequestIcon />}
    >
      <RepoSubList.List>
        {repos.map(({ events, name, url }) => (
          <RepoSubList.RepoItem
            key={name}
            title={
              <>
                <Link className="mr-2" href={url} target="_blank">
                  {name}
                </Link>
                {events.length > 1 && `${events.length} issues`}
              </>
            }
          >
            {events.map(event => {
              const pr = event.payload.pull_request;
              return (
                <RepoSubList.SubItem
                  key={pr.id}
                  icon={
                    pr.merged ? (
                      <GitMergeIcon className="mt-[2px] text-color-[var(--fgColor-done)]" />
                    ) : pr.state === "closed" ? (
                      <GitPullRequestClosedIcon className="mt-[2px] text-color-[var(--fgColor-done)]" />
                    ) : pr.draft ? (
                      <GitPullRequestDraftIcon className="mt-[2px]" />
                    ) : (
                      <GitPullRequestIcon className="mt-[2px] text-color-[var(--fgColor-open)]" />
                    )
                  }
                  href={pr.html_url}
                >
                  {pr.title}
                </RepoSubList.SubItem>
              );
            })}
          </RepoSubList.RepoItem>
        ))}
      </RepoSubList.List>
    </EventItemLayout>
  );
});
