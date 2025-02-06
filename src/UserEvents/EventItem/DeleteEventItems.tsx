import { RepoIcon } from "@primer/octicons-react";
import { plural } from "#utils";
import { memo, useMemo } from "react";

import { type DeleteEvent } from "../interface";
import { EventItemLayout } from "./EventItemLayout";
import { RepoList } from "./RepoList";

export interface DeleteEventItemsProps {
  events: DeleteEvent[];
}

export const DeleteEventItems = /* @__PURE__ */ memo(function DeleteEventItems({ events }: DeleteEventItemsProps) {
  const DeleteRepoEvents = useMemo(() => events.filter(event => event.payload.ref_type === "repository"), [events]);

  if (!DeleteRepoEvents.length) {
    return null;
  }

  return (
    <EventItemLayout head={`Deleted ${plural(events.length, "repository")}`} icon={<RepoIcon />}>
      <RepoList events={DeleteRepoEvents} lineThrough />
    </EventItemLayout>
  );
});
