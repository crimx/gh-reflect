import { type GitHubEvent } from "../UserEvents/interface";

export const groupEventsByRepo = <T extends GitHubEvent>(
  events: T[],
  filter?: (event: T) => boolean,
): [string, T[]][] => {
  const reposMap = new Map<string, T[]>();
  for (const event of events) {
    if (!filter || filter(event)) {
      let events = reposMap.get(event.repo.name);
      if (!events) {
        reposMap.set(event.repo.name, (events = []));
      }
      events.push(event);
    }
  }
  return [...reposMap.entries()].sort((a, b) => b[1].length - a[1].length);
};
