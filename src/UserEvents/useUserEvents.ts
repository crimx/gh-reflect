import { useCallback, useMemo, useState } from "react";
import { BehaviorSubject, EMPTY, expand, type Observable, of, scan, switchMap } from "rxjs";

import { type Options } from "../Config";
import { fetchEvents, type FetchStatus } from "./fetchEvents";
import { type GitHubEvent } from "./schema.interface";

export interface UseEventsFetchStatus extends Omit<FetchStatus, "events"> {
  readonly eventsByType?: Record<string, GitHubEvent[]>;
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
            let eventsByType = acc.eventsByType;
            const { events, ...restStatus } = status;
            if (events?.length) {
              eventsByType = { ...eventsByType };
              for (const event of events) {
                const eventType = event.type || "unknown";
                eventsByType[eventType] = eventsByType[eventType] ? [...eventsByType[eventType], event] : [event];
              }
            }
            return eventsByType ? { ...restStatus, eventsByType } : restStatus;
          }),
        );
      }),
    );
  }, [options$$]);
  return [status$, setOptions];
};
