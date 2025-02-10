import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";
import { Link } from "@primer/react";
import { groupEventsByRepo, plural } from "#utils";
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
  const repos = useMemo(() => {
    return groupEventsByRepo(
      events,
      event => event.payload.action === "opened" || event.payload.action === "reopened",
    ).map(([repoName, events]) => (
      <RepoSubList.RepoItem
        key={repoName}
        title={
          <>
            <Link className="mr-2" href={`https://github.com/${repoName}`} target="_blank">
              {repoName}
            </Link>
            {events.length > 1 && `${events.length} issues`}
          </>
        }
      >
        {events.map(event => (
          <PRItem key={event.id} event={event} />
        ))}
      </RepoSubList.RepoItem>
    ));
  }, [events]);

  if (!repos.length) {
    return null;
  }

  return (
    <EventItemLayout
      head={`Opened ${plural(events.length, "pull request")} in ${plural(repos.length, "repository")}`}
      icon={<GitPullRequestIcon />}
    >
      <RepoSubList.List>{repos}</RepoSubList.List>
    </EventItemLayout>
  );
});

const PRItem = /* @__PURE__ */ memo(function PRItem({ event }: { event: PullRequestEvent }) {
  const prItem = event.payload.pull_request;
  return (
    <RepoSubList.SubItem
      icon={
        prItem.merged ? (
          <GitMergeIcon className="mt-[2px] text-color-[var(--fgColor-done)]" />
        ) : prItem.state === "closed" ? (
          <GitPullRequestClosedIcon className="mt-[2px] text-color-[var(--fgColor-done)]" />
        ) : prItem.draft ? (
          <GitPullRequestDraftIcon className="mt-[2px]" />
        ) : (
          <GitPullRequestIcon className="mt-[2px] text-color-[var(--fgColor-open)]" />
        )
      }
      href={prItem.html_url}
    >
      {prItem.title}
    </RepoSubList.SubItem>
  );
});
