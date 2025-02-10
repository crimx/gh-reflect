import { GitCommitIcon, RepoPushIcon } from "@primer/octicons-react";
import { Link } from "@primer/react";
import { groupEventsByRepo, plural } from "#utils";
import { memo, useMemo } from "react";

import { type PushEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";
import { RepoSubList } from "./RepoSubList";

export interface PushEventItemsProps {
  events: PushEvent[];
}

export const PushEventItems = /* @__PURE__ */ memo<PushEventItemsProps>(function PushEventItems({ events }) {
  let commitsTotal = 0;
  const repos = useMemo(() => {
    const repos = groupEventsByRepo(events);
    commitsTotal = repos.reduce(
      (acc, [, events]) => acc + events.reduce((acc, event) => acc + event.payload.size, 0),
      0,
    );
    return repos.map(([repoName, events]) => (
      <RepoSubList.RepoItem
        key={repoName}
        title={
          <>
            <Link className="mr-2" href={`https://github.com/${repoName}`} target="_blank">
              {repoName}
            </Link>
            {events.length > 1 && `${events.length} commits`}
          </>
        }
      >
        {events.map(event =>
          event.payload.commits.map(commit => <CommitItem key={commit.sha} commit={commit} repoName={repoName} />),
        )}
      </RepoSubList.RepoItem>
    ));
  }, [events]);
  return (
    <EventItemLayout
      head={`Pushed ${plural(commitsTotal, "commit")} to ${plural(repos.length, "repository")}`}
      icon={<RepoPushIcon />}
    >
      <RepoSubList.List>{repos}</RepoSubList.List>
    </EventItemLayout>
  );
});

const CommitItem = /* @__PURE__ */ memo(function CommitItem({
  repoName,
  commit,
}: {
  repoName: string;
  commit: PushEvent["payload"]["commits"][number];
}) {
  return (
    <RepoSubList.SubItem
      icon={<GitCommitIcon className="text-color-[var(--fgColor-done)]" />}
      href={`https://github.com/${repoName}/commit/${commit.sha}`}
    >
      {commit.message.replace(/\n[\s\S]*$/, "")}
    </RepoSubList.SubItem>
  );
});
