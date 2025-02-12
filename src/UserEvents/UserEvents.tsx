import { SkeletonText } from "@primer/react/experimental";
import { useObservableState } from "observable-hooks";
import { memo } from "react";
import { type Observable } from "rxjs";

import { Empty } from "./Empty";
import { CreateEventItems } from "./EventItem/CreateEventItems";
import { DeleteEventItems } from "./EventItem/DeleteEventItems";
import { IssuesEventItems } from "./EventItem/IssuesEventItems";
import { PullRequestEventItems } from "./EventItem/PullRequestEventItems";
import { PullRequestReviewEventItems } from "./EventItem/PullRequestReviewEventItems";
import { PushEventItems } from "./EventItem/PushEventItems";
import {
  type CreateEvent,
  type DeleteEvent,
  type IssuesEvent,
  type PullRequestEvent,
  type PushEvent,
  type PullRequestReviewEvent,
} from "./interface";
import { type UseEventsFetchStatus } from "./useUserEvents";

export interface UserEventsProps {
  status$: Observable<UseEventsFetchStatus>;
}

export const UserEvents = /* @__PURE__ */ memo<UserEventsProps>(function UserEvents({ status$ }) {
  const status = useObservableState(status$);

  if (status?.eventsByType) {
    const {
      CreateEvent,
      PullRequestEvent,
      IssuesEvent,
      PushEvent,
      PullRequestReviewEvent,
      // PullRequestReviewCommentEvent,
      // CommitCommentEvent,
      // IssueCommentEvent,
      DeleteEvent,
      // ...restEvents
    } = status.eventsByType;

    return (
      <div className="px-4">
        {PullRequestEvent && <PullRequestEventItems events={PullRequestEvent as PullRequestEvent[]} />}
        {IssuesEvent && <IssuesEventItems events={IssuesEvent as IssuesEvent[]} />}
        {PushEvent && <PushEventItems events={PushEvent as PushEvent[]} />}
        {PullRequestReviewEvent && (
          <PullRequestReviewEventItems events={PullRequestReviewEvent as PullRequestReviewEvent[]} />
        )}
        {CreateEvent && <CreateEventItems events={CreateEvent as CreateEvent[]} />}
        {DeleteEvent && <DeleteEventItems events={DeleteEvent as DeleteEvent[]} />}
        {/* {Object.entries(restEvents).map(([eventType, events]) => (
          <FallbackEventItems key={eventType} events={events} />
        ))} */}
      </div>
    );
  }

  if (status?.fetching) {
    return (
      <div className="p-4">
        <SkeletonText lines={5} size="bodyLarge" />
      </div>
    );
  }

  return <Empty />;
});
