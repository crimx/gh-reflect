import { RepoIcon } from "@primer/octicons-react";
import { plural } from "#utils";
import { memo } from "react";

import { type ForkEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";
import { RepoList } from "./RepoList";

export interface ForkEventItemsProps {
  events: ForkEvent[];
}

export const ForkEventItems = /* @__PURE__ */ memo(function ForkEventItems({ events }: ForkEventItemsProps) {
  return (
    <EventItemLayout head={`Forked ${plural(events.length, "repository")}`} icon={<RepoIcon />}>
      <RepoList events={events} />
    </EventItemLayout>
  );
});
