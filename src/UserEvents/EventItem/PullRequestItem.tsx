import { Link, Popover } from "@primer/react";
import { useObservableState } from "observable-hooks";
import { memo, useState } from "react";
import { BehaviorSubject } from "rxjs";

import { PullRequestCard } from "../PullRequestCard";
import { PullRequestIcon } from "../PullRequestIcon";
import { type PullRequest } from "../schema.interface";
import { RepoSubList } from "./RepoSubList";

export interface PullRequestItemProps {
  pullRequest: PullRequest;
  date: string;
}

let _popId = 0;
const nextPopId = (): number => (_popId += 1) | 0;
const openId$ = /* @__PURE__ */ new BehaviorSubject<number | null>(null);
let ticket: ReturnType<typeof setTimeout> | null = null;

export const PullRequestItem = /* @__PURE__ */ memo<PullRequestItemProps>(function PullRequestItem({
  pullRequest,
  date,
}) {
  const openId = useObservableState(openId$);
  const [popId] = useState(nextPopId);

  const open = (): void => {
    if (ticket !== null) {
      clearTimeout(ticket);
    }
    if (openId$.value === null) {
      openId$.next(popId);
    } else {
      ticket = setTimeout(() => {
        openId$.next(popId);
      }, 500);
    }
  };
  const close = (): void => {
    if (ticket !== null) {
      clearTimeout(ticket);
    }
    ticket = setTimeout(() => {
      if (openId$.value === popId) {
        openId$.next(null);
      }
    }, 1000);
  };

  return (
    <RepoSubList.SubItem icon={<PullRequestIcon pullRequest={pullRequest} />} date={date}>
      <div className="relative">
        <Link
          className="text-[--fgColor-default] hover:color-[--fgColor-accent]"
          href={pullRequest.html_url}
          target="_blank"
          onMouseEnter={open}
          onMouseLeave={close}
        >
          {pullRequest.title}
        </Link>
        {openId === popId && (
          <Popover open className="top-100% left-5 translate-y-2 rounded-md shadow-lg">
            <Popover.Content className="w-sm! p-0! [&::before]:left-30px! [&::after]:left-30px!">
              <PullRequestCard pullRequest={pullRequest} onMouseEnter={open} onMouseLeave={close} />
            </Popover.Content>
          </Popover>
        )}
      </div>
    </RepoSubList.SubItem>
  );
});
