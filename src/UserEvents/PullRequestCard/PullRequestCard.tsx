import styles from "./PullRequestCard.module.scss";

import { Link } from "@primer/react";
import { clsx } from "clsx";

import { Markdown } from "../../Markdown";
import { plural } from "../../utils";
import { type PullRequest } from "../interface";
import { PullRequestIcon } from "../PullRequestIcon";
import { DiffStat } from "./DiffStat";

export interface PullRequestCardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  pullRequest: PullRequest;
}

export const PullRequestCard = ({ pullRequest, className, ...props }: PullRequestCardProps) => {
  return (
    <div {...props} className={clsx("p-4", className)}>
      <PullRequestIcon pullRequest={pullRequest} className="float-left mt-1" />
      <div className="ml-6">
        <h3 className="line-height-tight my-0">
          <Link className="color-[var(--fgColor-default)] break-all" href={pullRequest.html_url}>
            {pullRequest.title}
          </Link>
        </h3>
        <div className="color-[var(--fgColor-muted)] mb-0 mt-2">
          {pullRequest.body && <Markdown text={pullRequest.body} className={styles.md} />}
        </div>
        <div className="text-xs color-[var(--fgColor-muted)] mt-2">
          <DiffStat additions={pullRequest.additions} deletions={pullRequest.deletions} />
          <span className="font-600 mx-1">•</span>
          {plural(pullRequest.comments, "comment")}
        </div>
      </div>
    </div>
  );
};
