import { catchError, type Observable, of, startWith, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

import { type UserEvent } from "./interface";

export interface FetchStatus {
  fetching: boolean;
  page: number;
  error?: Error;
  events?: UserEvent[];
  limit?: null | number;
  remaining?: null | number;
  status?: null | number;
}

export const fetchEvents = (username: string, token?: string, page = 1): Observable<FetchStatus> => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  return fromFetch(`https://api.github.com/users/${username}/events?per_page=100&page=${page}`, {
    headers,
  }).pipe(
    switchMap(async (response: Response): Promise<FetchStatus> => {
      const limit = Number(response.headers.get("x-ratelimit-limit")) || 0;
      const remaining = Number(response.headers.get("x-ratelimit-remaining")) || 0;

      try {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return {
          events: await response.json(),
          fetching: false,
          limit,
          page,
          remaining,
          status: response.status,
        };
      } catch (e) {
        return {
          error: e as Error,
          fetching: false,
          limit,
          page,
          remaining,
          status: response.status,
        };
      }
    }),
    catchError(e => of<FetchStatus>({ error: e as Error, fetching: false, page })),
    startWith<FetchStatus>({ fetching: true, page }),
  );
};
