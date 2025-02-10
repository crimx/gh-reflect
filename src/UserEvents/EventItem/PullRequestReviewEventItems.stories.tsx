import { type Meta, type StoryObj } from "@storybook/react";

import PullRequestReviewEventFixture from "../../__fixtures__/PullRequestReviewEvent.fixture.json";
import { type PullRequestReviewEvent } from "../interface";
import { PullRequestReviewEventItems } from "./PullRequestReviewEventItems";

const meta = {
  component: PullRequestReviewEventItems,
  title: "UserEvents/PullRequestReviewEventItems",
} satisfies Meta<typeof PullRequestReviewEventItems>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    events: PullRequestReviewEventFixture as unknown as PullRequestReviewEvent[],
  },
};
