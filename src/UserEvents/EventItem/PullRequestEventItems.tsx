import { GitPullRequestIcon } from "@primer/octicons-react";
import { Link } from "@primer/react";
import { groupEventsByRepo, plural } from "#utils";
import { memo, useMemo } from "react";

import { type PullRequestEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";
import { PullRequestItem } from "./PullRequestItem";
import { RepoSubList } from "./RepoSubList";

export interface PullRequestEventItemsProps {
  events: PullRequestEvent[];
}

export const PullRequestEventItems = /* @__PURE__ */ memo(function PullRequestEventItems({
  events,
}: PullRequestEventItemsProps) {
  return (
    <>
      <PullRequestOpenEventItems events={events} />
      <PullRequestClosedEventItems events={events} />
    </>
  );
});

export const PullRequestOpenEventItems = ({ events }: PullRequestEventItemsProps) => {
  const [repos, prCount] = useMemo(() => {
    let prCount = 0;
    const repos = groupEventsByRepo(
      events,
      event => event.payload.action === "opened" || event.payload.action === "reopened",
    ).map(([repoName, events]) => {
      prCount += events.length;
      return (
        <RepoSubList.RepoItem
          key={repoName}
          title={
            <>
              <Link className="mr-2" href={`https://github.com/${repoName}`} target="_blank">
                {repoName}
              </Link>
              {plural(events.length, "pull request")}
            </>
          }
        >
          {events.map(event => (
            <PullRequestItem
              key={event.id}
              pullRequest={event.payload.pull_request}
              date={event.payload.pull_request.created_at}
            />
          ))}
        </RepoSubList.RepoItem>
      );
    });
    return [repos, prCount];
  }, [events]);

  if (!repos.length) {
    return null;
  }

  return (
    <EventItemLayout
      head={`Opened ${plural(prCount, "pull request")} in ${plural(repos.length, "repository")}`}
      icon={<GitPullRequestIcon />}
    >
      <RepoSubList.List>{repos}</RepoSubList.List>
    </EventItemLayout>
  );
};

export const PullRequestClosedEventItems = ({ events }: PullRequestEventItemsProps) => {
  const [repos, prCount] = useMemo(() => {
    let prCount = 0;
    const repos = groupEventsByRepo(events, event => event.payload.action === "closed").map(([repoName, events]) => {
      prCount += events.length;

      const title = (
        <>
          <Link className="mr-2" href={`https://github.com/${repoName}`} target="_blank">
            {repoName}
          </Link>
          {plural(events.length, "pull request")}
        </>
      );

      const items = () =>
        events.map(event => (
          <PullRequestItem
            key={event.id}
            pullRequest={event.payload.pull_request}
            date={event.payload.pull_request.closed_at}
          />
        ));

      if (events.some(isHumanPR)) {
        <RepoSubList.RepoItem key={repoName} title={title}>
          {items()}
        </RepoSubList.RepoItem>;
      }

      return (
        <RepoSubList.RepoItemExpandable key={repoName} title={title}>
          {items}
        </RepoSubList.RepoItemExpandable>
      );
    });
    return [repos, prCount];
  }, [events]);

  if (!repos.length) {
    return null;
  }

  return (
    <EventItemLayout
      head={`Closed ${plural(prCount, "pull request")} in ${plural(repos.length, "repository")}`}
      icon={<GitPullRequestIcon />}
    >
      <RepoSubList.List>{repos}</RepoSubList.List>
    </EventItemLayout>
  );
};

const isHumanPR = (event: PullRequestEvent): boolean =>
  event.payload.pull_request.user.type !== "Bot" &&
  !event.payload.pull_request.body?.includes("This PR was generated with [Release Please]");
