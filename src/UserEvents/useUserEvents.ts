import { useCallback, useMemo, useState } from "react";
import { BehaviorSubject, EMPTY, expand, type Observable, of, scan, switchMap } from "rxjs";

import { type Options } from "../Config";
import { fetchEvents, type FetchStatus } from "./fetchEvents";

export const useEvents = (): [Observable<FetchStatus>, (options: Options | undefined) => void] => {
  const [options$$] = useState(() => new BehaviorSubject<Options | undefined>(undefined));
  const setOptions = useCallback((options: Options | undefined) => options$$.next(options), [options$$]);
  const status$ = useMemo(() => {
    return options$$.pipe(
      switchMap(options => {
        if (!options) {
          return of<FetchStatus>({ fetching: false, page: 0 });
        }
        return fetchEvents(options.name, options.token).pipe(
          expand((status, index) => {
            if (!status.fetching && !status.error && status.events?.length && status.remaining) {
              const oldestEvent = status.events[0];
              if (oldestEvent.created_at && new Date(oldestEvent.created_at).getTime() > options.since) {
                return fetchEvents(options.name, options.token, index + 2);
              }
            }
            return EMPTY;
          }),
          scan((acc, status) => {
            let statusEvents = acc.events?.slice();
            if (status.events) {
              statusEvents ??= [];
              for (const event of status.events) {
                if (!event.created_at || new Date(event.created_at).getTime() >= options.since) {
                  statusEvents.push(event);
                } else {
                  break;
                }
              }
            }
            return statusEvents ? { ...status, events: statusEvents } : status;
          }),
        );
      }),
    );
  }, [options$$]);
  return [status$, setOptions];
};
