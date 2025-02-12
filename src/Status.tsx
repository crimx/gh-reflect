import { Spinner } from "@primer/react";
import { Banner } from "@primer/react/experimental";
import { plural } from "#utils";
import { useObservableState } from "observable-hooks";
import { type Observable } from "rxjs";

import { type UseEventsFetchStatus } from "./UserEvents";

export interface StatusProps {
  status$: Observable<UseEventsFetchStatus>;
}

export const Status = ({ status$ }: StatusProps) => {
  const status = useObservableState(status$);

  if (!status?.page) {
    return null;
  }

  if (status.error) {
    return (
      <Banner
        variant="critical"
        title={`Error at page ${status.page} with status code ${status.status}`}
        description={status.error.message}
      />
    );
  }

  const info: string[] = [];
  if (status.eventsCount) {
    info.push(`events: ${status.eventsCount}`);
  }
  if (status.remaining && status.limit) {
    info.push(`rate limit: ${status.remaining || 0}/${status.limit || 0}`);
  }
  const description = info.length ? info.join(", ") : undefined;

  if (!status.fetching) {
    return <Banner variant="success" title={`Success (${plural(status.page, "page")})`} description={description} />;
  }

  return (
    <Banner
      icon={<Spinner className="fill-transparent!" />}
      title={`Fetching page ${status.page}`}
      description={description}
    />
  );
};
