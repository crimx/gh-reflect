import { memo } from "react";

import { type UserEvent } from "../interface";
import { FallbackEventItem } from "./FallbackEventItem";

export interface EventItemProps {
  event: UserEvent;
}

export const EventItem = /* @__PURE__ */ memo<EventItemProps>(function EventItem({ event }) {
  switch (event.type) {
    // case "PushEvent":
    // case "CreateEvent":
    // case "DeleteEvent":
    // case "ForkEvent":
    // case "PublicEvent":
    // case "PullRequestEvent":
    // case "PullRequestReviewEvent":
    // case "PullRequestReviewCommentEvent":
    // case "IssuesEvent":
    // case "IssueCommentEvent":
    default: {
      return <FallbackEventItem event={event} />;
    }
  }
});
