import { ReportIcon } from "@primer/octicons-react";
import { memo } from "react";

import { Markdown } from "../../Markdown";
import { type GitHubEvent } from "../interface";
import { EventItemLayoutExpandable } from "./EventItemLayout";
import { LabelRepo } from "./LabelRepo";

export interface FallbackEventItemProps {
  event: GitHubEvent;
}

export const FallbackEventItem = /* @__PURE__ */ memo<FallbackEventItemProps>(function FallbackEventItem({ event }) {
  return (
    <EventItemLayoutExpandable
      head={
        <>
          {event.type} at <LabelRepo repo={event.repo} />
        </>
      }
      icon={<ReportIcon />}
    >
      {() => <Markdown text={"```json\n" + JSON.stringify(event, null, 2) + "\n```"} />}
    </EventItemLayoutExpandable>
  );
});

export interface FallbackEventItemsProps {
  events: GitHubEvent[];
}

export const FallbackEventItems = /* @__PURE__ */ memo<FallbackEventItemsProps>(function FallbackEventItems({
  events,
}) {
  return (
    <>
      {events.map(event => (
        <FallbackEventItem key={event.id} event={event} />
      ))}
    </>
  );
});
