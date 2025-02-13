import { RepoIcon } from "@primer/octicons-react";
import { plural } from "#utils";
import { memo } from "react";

import { type WatchEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";
import { RepoList } from "./RepoList";

export interface WatchEventItemsProps {
  events: WatchEvent[];
}

export const WatchEventItems = /* @__PURE__ */ memo(function WatchEventItems({ events }: WatchEventItemsProps) {
  return (
    <EventItemLayout head={`Watched ${plural(events.length, "repository")}`} icon={<RepoIcon />}>
      <RepoList events={events} />
    </EventItemLayout>
  );
});
