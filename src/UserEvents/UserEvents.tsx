import { useObservableState } from "observable-hooks";
import { memo } from "react";
import { type Observable } from "rxjs";

import { DateDivider } from "./DateDivider";
import { Empty } from "./Empty";
import { CreateEventItems } from "./EventItem/CreateEventItems";
import { DeleteEventItems } from "./EventItem/DeleteEventItems";
import { FallbackEventItems } from "./EventItem/FallbackEventItems";
import { IssuesEventItems } from "./EventItem/IssuesEventItems";
import { PullRequestEventItems } from "./EventItem/PullRequestEventItems";
import { PushEventItems } from "./EventItem/PushEventItems";
import {
  type CreateEvent,
  type DeleteEvent,
  type GitHubEvent,
  type IssuesEvent,
  type PullRequestEvent,
  type PushEvent,
} from "./interface";
import { type UseEventsFetchStatus } from "./useUserEvents";

export interface UserEventsProps {
  status$: Observable<UseEventsFetchStatus>;
}

export const UserEvents = /* @__PURE__ */ memo<UserEventsProps>(function UserEvents({ status$ }) {
  const status = useObservableState(status$);

  if (status?.eventsByDate) {
    return (
      <div className="px-4">
        {Object.entries(status.eventsByDate).map(([id, events]) => (
          <UserEventsByDate key={id} id={id} events={events} />
        ))}
      </div>
    );
  }

  return <Empty />;
});

interface UserEventsByDateProps {
  id: string;
  events: Record<string, GitHubEvent[]>;
}

const UserEventsByDate = /* @__PURE__ */ memo<UserEventsByDateProps>(function UserEventsByDate({ id, events }) {
  const [date, year] = id.split(" ");

  const {
    CreateEvent,
    PullRequestEvent,
    IssuesEvent,
    PushEvent,
    // PullRequestReviewEvent,
    // PullRequestReviewCommentEvent,
    // CommitCommentEvent,
    // IssueCommentEvent,
    DeleteEvent,
    ...restEvents
  } = events;

  return (
    <>
      <DateDivider date={date} year={year} key={id} />
      {CreateEvent && <CreateEventItems events={CreateEvent as CreateEvent[]} />}
      {PullRequestEvent && <PullRequestEventItems events={PullRequestEvent as PullRequestEvent[]} />}
      {IssuesEvent && <IssuesEventItems events={IssuesEvent as IssuesEvent[]} />}
      {PushEvent && <PushEventItems events={PushEvent as PushEvent[]} />}
      {DeleteEvent && <DeleteEventItems events={DeleteEvent as DeleteEvent[]} />}
      {Object.entries(restEvents).map(([eventType, events]) => (
        <FallbackEventItems key={eventType} events={events} />
      ))}
    </>
  );
});
