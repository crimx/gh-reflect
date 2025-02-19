import { IssueClosedIcon, IssueDraftIcon, IssueOpenedIcon, IssueReopenedIcon } from "@primer/octicons-react";
import { Link } from "@primer/react";
import { groupEventsByRepo, plural } from "#utils";
import { memo, useMemo } from "react";

import { type IssuesEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";
import { RepoSubList } from "./RepoSubList";

export interface IssuesEventItemsProps {
  events: IssuesEvent[];
}

export const IssuesEventItems = /* @__PURE__ */ memo(function IssueEventItems({ events }: IssuesEventItemsProps) {
  const repos = useMemo(() => {
    return groupEventsByRepo(events).map(([repoName, events]) => (
      <RepoSubList.RepoItem
        key={repoName}
        title={
          <>
            <Link className="mr-2" href={`https://github.com/${repoName}`} target="_blank">
              {repoName}
            </Link>
            {plural(events.length, "issue")}
          </>
        }
      >
        {events.map(event => (
          <IssueItem key={event.id} event={event} />
        ))}
      </RepoSubList.RepoItem>
    ));
  }, [events]);

  if (!repos.length) {
    return null;
  }

  return (
    <EventItemLayout
      head={`Opened ${plural(events.length, "issue")} in ${plural(repos.length, "repository")}`}
      icon={<IssueOpenedIcon />}
    >
      <RepoSubList.List>{repos}</RepoSubList.List>
    </EventItemLayout>
  );
});

const IssueItem = /* @__PURE__ */ memo(function IssueItem({ event }: { event: IssuesEvent }) {
  const { issue } = event.payload;
  return (
    <RepoSubList.SubItem
      icon={
        issue.state === "closed" ? (
          <IssueClosedIcon className="mt-[2px] text-color-[var(--fgColor-done)]" />
        ) : issue.draft ? (
          <IssueDraftIcon className="mt-[2px]" />
        ) : issue.state_reason === "reopened" ? (
          <IssueReopenedIcon className="mt-[2px] text-color-[var(--fgColor-open)]" />
        ) : (
          <IssueOpenedIcon className="mt-[2px] text-color-[var(--fgColor-open)]" />
        )
      }
      href={issue.html_url}
      date={issue.created_at}
    >
      {issue.title}
    </RepoSubList.SubItem>
  );
});
