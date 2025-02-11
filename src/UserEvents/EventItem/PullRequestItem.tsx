import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";
import { memo } from "react";

import { type PullRequest } from "../schema.interface";
import { RepoSubList } from "./RepoSubList";

export interface PullRequestItemProps {
  pullRequest: PullRequest;
}

export const PullRequestItem = /* @__PURE__ */ memo<PullRequestItemProps>(function PullRequestItem({ pullRequest }) {
  return (
    <RepoSubList.SubItem
      icon={
        pullRequest.merged ? (
          <GitMergeIcon className="mt-[2px] text-color-[var(--fgColor-done)]" />
        ) : pullRequest.state === "closed" ? (
          <GitPullRequestClosedIcon className="mt-[2px] text-color-[var(--fgColor-closed)]" />
        ) : pullRequest.draft ? (
          <GitPullRequestDraftIcon className="mt-[2px]" />
        ) : (
          <GitPullRequestIcon className="mt-[2px] text-color-[var(--fgColor-open)]" />
        )
      }
      href={pullRequest.html_url}
    >
      {pullRequest.title}
    </RepoSubList.SubItem>
  );
});
