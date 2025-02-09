import { RepoIcon } from "@primer/octicons-react";
import { plural } from "#utils";
import { memo, useMemo } from "react";

import { type CreateEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";
import { RepoList } from "./RepoList";

export interface CreateEventItemsProps {
  events: CreateEvent[];
}

export const CreateEventItems = /* @__PURE__ */ memo(function CreateEventItems({ events }: CreateEventItemsProps) {
  const createRepoEvents = useMemo(() => events.filter(event => event.payload.ref_type === "repository"), [events]);

  if (!createRepoEvents.length) {
    return null;
  }

  return (
    <EventItemLayout head={`Created ${plural(createRepoEvents.length, "repository")}`} icon={<RepoIcon />}>
      <RepoList events={createRepoEvents} />
    </EventItemLayout>
  );
});
