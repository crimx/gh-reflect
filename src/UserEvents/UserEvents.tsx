import { useObservableState } from "observable-hooks";
import { memo, type ReactElement } from "react";
import { type Observable } from "rxjs";

import { DateDivider } from "./DateDivider";
import { Empty } from "./Empty";
import { EventItem } from "./EventItem";
import { type FetchStatus } from "./fetchEvents";

export interface UserEventsProps {
  status$: Observable<FetchStatus>;
}

export const UserEvents = /* @__PURE__ */ memo<UserEventsProps>(function UserEvents({ status$ }) {
  const status = useObservableState(status$);

  if (!status?.events?.length) {
    return <Empty />;
  }

  let currentDate: null | string = null;
  const eventItems: ReactElement[] = [];
  for (const event of status.events) {
    if (event.created_at) {
      const createdAt = new Date(event.created_at);
      const date = createdAt.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
      });
      const year = `${createdAt.getFullYear()}`;

      const lastDate: null | string = currentDate;
      currentDate = `${date} ${year}`;
      if (lastDate !== currentDate) {
        eventItems.push(<DateDivider date={date} key={currentDate} year={year} />);
      }
    }
    eventItems.push(<EventItem event={event} key={event.id} />);
  }

  return <div className="px-4">{eventItems}</div>;
});
