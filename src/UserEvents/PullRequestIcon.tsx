import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";
import { memo } from "react";

import { type PullRequest } from "./interface";

export interface PullRequestIconProps {
  pullRequest: PullRequest;
  className?: string;
}

export const PullRequestIcon = /* @__PURE__ */ memo<PullRequestIconProps>(function PullRequestIcon({
  pullRequest,
  className = "",
}) {
  return pullRequest.merged ? (
    <GitMergeIcon className={`mt-[2px] text-color-[--fgColor-done] ${className}`} />
  ) : pullRequest.state === "closed" ? (
    <GitPullRequestClosedIcon className={`mt-[2px] text-color-[--fgColor-closed] ${className}`} />
  ) : pullRequest.draft ? (
    <GitPullRequestDraftIcon className={`mt-[2px] ${className}`} />
  ) : (
    <GitPullRequestIcon className={`mt-[2px] text-color-[--fgColor-open] ${className}`} />
  );
});
