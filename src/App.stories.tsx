import { faker } from "@faker-js/faker";
import { type Meta, type StoryObj } from "@storybook/react";
import { delay, http, HttpResponse } from "msw";

import CreateEventFixture from "./__fixtures__/CreateEvent.fixture.json";
import DeleteEventFixture from "./__fixtures__/DeleteEvent.fixture.json";
import IssueCommentEventFixture from "./__fixtures__/IssueCommentEvent.fixture.json";
import PullRequestEventFixture from "./__fixtures__/PullRequestEvent.fixture.json";
import PullRequestReviewCommentEventFixture from "./__fixtures__/PullRequestReviewCommentEvent.fixture.json";
import PullRequestReviewEventFixture from "./__fixtures__/PullRequestReviewEvent.fixture.json";
import PushEventFixture from "./__fixtures__/PushEvent.fixture.json";
import ReleaseEventFixture from "./__fixtures__/ReleaseEvent.fixture.json";
import { App } from "./App";
import { type GitHubEvent } from "./UserEvents/interface";
import { type UserEvents } from "./UserEvents/UserEvents";

const meta = {
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  title: "App",
} satisfies Meta<typeof UserEvents>;

export default meta;

export const Overview: StoryObj = {
  parameters: {
    msw: {
      handlers: [
        http.get(/\/api.github.com\/users\/[^/]+\/events/, async ({ request }) => {
          const ITEMS_PER_PAGE = 10;
          const url = new URL(request.url);
          const page = Number(url.searchParams.get("page")) || 0;
          const date = new Date();
          date.setTime(date.getTime() - page * ITEMS_PER_PAGE * 60 * 60 * 1000);

          const events = faker.helpers
            .uniqueArray<GitHubEvent>(
              [
                ...CreateEventFixture,
                ...DeleteEventFixture,
                ...IssueCommentEventFixture,
                ...PullRequestEventFixture,
                ...PullRequestReviewCommentEventFixture,
                ...PullRequestReviewEventFixture,
                ...PushEventFixture,
                ...ReleaseEventFixture,
              ],
              ITEMS_PER_PAGE,
            )
            .map((event, i) => ({
              ...event,
              created_at: new Date(date.getTime() - 60 * 60 * 1000 * i).toISOString(),
              id: faker.string.numeric(11),
            }));

          if (page > 1) {
            await delay(1000);
          }

          return HttpResponse.json(events, {
            headers: {
              "x-ratelimit-limit": "1000",
              "x-ratelimit-remaining": "999",
            },
          });
        }),
      ],
    },
  },
};
