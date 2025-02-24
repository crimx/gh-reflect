import { useObservableCallback } from "observable-hooks";
import { EMPTY, expand, type Observable, of, scan, switchMap } from "rxjs";

import { type Options } from "../Config";
import { fetchEvents, type FetchStatus } from "./fetchEvents";
import { type GitHubEvent } from "./schema.interface";

export interface UseEventsFetchStatus extends Omit<FetchStatus, "events"> {
  readonly eventsByType?: Record<string, GitHubEvent[]>;
  readonly eventsCount?: number;
}

export const useEvents = (): [(options: Options | undefined) => void, Observable<UseEventsFetchStatus>] => {
  return useObservableCallback<UseEventsFetchStatus, Options | undefined>(options$ =>
    options$.pipe(
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
            const { events, ...restStatus } = status;
            const eventsCount = (acc.eventsCount || 0) + (events?.length || 0);
            const limit = status.limit ?? acc.limit;
            const remaining = status.remaining ?? acc.remaining;
            let eventsByType = acc.eventsByType;
            if (events?.length) {
              eventsByType = { ...eventsByType };
              for (const event of events) {
                if (event.created_at && new Date(event.created_at).getTime() >= options.since) {
                  const eventType = event.type || "unknown";
                  eventsByType[eventType] = eventsByType[eventType] ? [...eventsByType[eventType], event] : [event];
                }
              }
            }
            return { ...restStatus, eventsByType, eventsCount, limit, remaining };
          }),
        );
      }),
    ),
  );
};
