import { useCallback, useMemo, useState } from "react";
import { BehaviorSubject, EMPTY, expand, type Observable, of, scan, switchMap } from "rxjs";

import { type Options } from "../Config";
import { fetchEvents, type FetchStatus } from "./fetchEvents";
import { type GitHubEvent } from "./schema.interface";

export interface UseEventsFetchStatus extends Omit<FetchStatus, "events"> {
  readonly eventsByDate?: Record<string, Record<string, GitHubEvent[]>>;
}

export const useEvents = (): [Observable<UseEventsFetchStatus>, (options: Options | undefined) => void] => {
  const [options$$] = useState(() => new BehaviorSubject<Options | undefined>(undefined));
  const setOptions = useCallback((options: Options | undefined) => options$$.next(options), [options$$]);
  const status$ = useMemo(() => {
    return options$$.pipe(
      switchMap(options => {
        if (!options) {
          return of<FetchStatus>({ fetching: false, page: 0 });
        }
        return fetchEvents(options.name, options.token).pipe(
          expand(status => {
            if (!status.fetching && !status.error && status.events?.length && status.remaining) {
              const oldestEvent = status.events[0];
              if (oldestEvent.created_at && new Date(oldestEvent.created_at).getTime() > options.since) {
                return fetchEvents(options.name, options.token, status.page + 1);
              }
            }
            return EMPTY;
          }),
          scan((acc: UseEventsFetchStatus, status: FetchStatus): UseEventsFetchStatus => {
            let eventsByDate = acc.eventsByDate;
            const { events, ...restStatus } = status;
            if (events?.length) {
              eventsByDate = { ...eventsByDate };
              for (const event of events) {
                if (event.type && event.created_at) {
                  const createdAt = new Date(event.created_at);
                  const date = createdAt.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                  });
                  const year = `${createdAt.getFullYear()}`;
                  const id = `${date} ${year}`;
                  const eventType = event.type || "unknown";
                  eventsByDate[id] = {
                    ...eventsByDate[id],
                    [eventType]: eventsByDate[id]?.[eventType] ? [...eventsByDate[id][eventType], event] : [event],
                  };
                }
              }
            }
            return eventsByDate ? { ...restStatus, eventsByDate } : restStatus;
          }),
        );
      }),
    );
  }, [options$$]);
  return [status$, setOptions];
};
