import { faker } from "@faker-js/faker";
import { type Meta, type StoryObj } from "@storybook/react";

import CreateEventFixture from "../../__fixtures__/CreateEvent.fixture.json";
import DeleteEventFixture from "../../__fixtures__/DeleteEvent.fixture.json";
import IssueCommentEventFixture from "../../__fixtures__/IssueCommentEvent.fixture.json";
import PullRequestEventFixture from "../../__fixtures__/PullRequestEvent.fixture.json";
import PullRequestReviewCommentEventFixture from "../../__fixtures__/PullRequestReviewCommentEvent.fixture.json";
import PullRequestReviewEventFixture from "../../__fixtures__/PullRequestReviewEvent.fixture.json";
import PushEventFixture from "../../__fixtures__/PushEvent.fixture.json";
import ReleaseEventFixture from "../../__fixtures__/ReleaseEvent.fixture.json";
import { type GitHubEvent } from "../interface";
import { FallbackEventItem } from "./FallbackEventItem";

const meta = {
  component: FallbackEventItem,
  title: "UserEvents/FallbackEventItem",
} satisfies Meta<typeof FallbackEventItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    event: faker.helpers.arrayElement(
      faker.helpers.arrayElement<GitHubEvent[]>([
        CreateEventFixture,
        DeleteEventFixture,
        IssueCommentEventFixture,
        PullRequestEventFixture,
        PullRequestReviewCommentEventFixture,
        PullRequestReviewEventFixture,
        PushEventFixture,
        ReleaseEventFixture,
      ]),
    ),
  },
};
