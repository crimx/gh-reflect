import { IssueClosedIcon, IssueDraftIcon, IssueOpenedIcon, IssueReopenedIcon } from "@primer/octicons-react";
import { Link } from "@primer/react";
import { plural } from "#utils";
import { memo, useMemo } from "react";

import { type IssuesEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";
import { RepoSubList } from "./RepoSubList";

export interface IssuesEventItemsProps {
  events: IssuesEvent[];
}

export const IssuesEventItems = /* @__PURE__ */ memo(function IssueEventItems({ events }: IssuesEventItemsProps) {
  const { issuesTotal, repos } = useMemo(() => {
    const reposMap = new Map<string, { events: IssuesEvent[]; name: string; url: string }>();
    for (const event of events) {
      if (event.payload.action === "opened" || event.payload.action === "reopened") {
        let repo = reposMap.get(event.repo.name);
        if (!repo) {
          reposMap.set(event.repo.name, (repo = { events: [], name: event.repo.name, url: event.repo.url }));
        }
        repo.events.push(event);
      }
    }
    const repos = [...reposMap.values()].sort((a, b) => b.events.length - a.events.length);
    const issuesTotal = repos.reduce((sum, { events }) => sum + events.length, 0);
    return { issuesTotal, repos };
  }, [events]);

  if (!repos.length) {
    return null;
  }

  return (
    <EventItemLayout
      head={`Opened ${plural(issuesTotal, "issue")} in ${plural(repos.length, "repository")}`}
      icon={<IssueOpenedIcon />}
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
              const { issue } = event.payload;
              return (
                <RepoSubList.SubItem
                  key={issue.id}
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
                  href={issue.url}
                >
                  {issue.title}
                </RepoSubList.SubItem>
              );
            })}
          </RepoSubList.RepoItem>
        ))}
      </RepoSubList.List>
    </EventItemLayout>
  );
});
