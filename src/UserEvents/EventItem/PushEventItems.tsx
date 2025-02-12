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
  const [repos, commitsCount] = useMemo(() => {
    const commitsCount = events.reduce(
      (acc, event) => acc + Math.max(event.payload.size, event.payload.commits.length),
      0,
    );
    const repos = groupEventsByRepo(events).map(([repoName, events]) => (
      <RepoSubList.RepoItemExpandable
        key={repoName}
        title={
          <>
            <Link className="mr-2" href={`https://github.com/${repoName}`} target="_blank">
              {repoName}
            </Link>
            {plural(events.length, "commit")}
          </>
        }
      >
        {() =>
          events.map(event => {
            return event.payload.commits.map(commit => (
              <CommitItem key={commit.sha} commit={commit} repoName={repoName} />
            ));
          })
        }
      </RepoSubList.RepoItemExpandable>
    ));
    return [repos, commitsCount];
  }, [events]);
  return (
    <EventItemLayout
      head={`Pushed ${plural(commitsCount, "commit")} to ${plural(repos.length, "repository")}`}
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
