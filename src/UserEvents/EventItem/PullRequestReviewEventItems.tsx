import { EyeIcon } from "@primer/octicons-react";
import { Link } from "@primer/react";
import { groupEventsByRepo, plural } from "#utils";
import { memo, useMemo } from "react";

import { type PullRequestReviewEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";
import { PullRequestItem } from "./PullRequestItem";
import { RepoSubList } from "./RepoSubList";

export interface PullRequestReviewEventItemsProps {
  events: PullRequestReviewEvent[];
}

export const PullRequestReviewEventItems = /* @__PURE__ */ memo(function PullRequestReviewEventItems({
  events,
}: PullRequestReviewEventItemsProps) {
  const repos = useMemo(() => {
    return groupEventsByRepo(events).map(([repoName, events]) => {
      return (
        <RepoSubList.RepoItemExpandable
          key={repoName}
          title={
            <>
              <Link className="mr-2" href={`https://github.com/${repoName}`} target="_blank">
                {repoName}
              </Link>
              {plural(events.length, "review")}
            </>
          }
        >
          {() => events.map(event => <PullRequestItem key={event.id} pullRequest={event.payload.pull_request} />)}
        </RepoSubList.RepoItemExpandable>
      );
    });
  }, [events]);

  if (!repos.length) {
    return null;
  }

  return (
    <EventItemLayout
      head={`Reviewed ${plural(events.length, "pull request")} in ${plural(repos.length, "repository")}`}
      icon={<EyeIcon />}
    >
      <RepoSubList.List>{repos}</RepoSubList.List>
    </EventItemLayout>
  );
});
