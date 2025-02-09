import { type Meta, type StoryObj } from "@storybook/react";

import PullRequestEventFixture from "../../__fixtures__/PullRequestEvent.fixture.json";
import { type PullRequestEvent } from "../interface";
import { PullRequestEventItems } from "./PullRequestEventItems";

const meta = {
  component: PullRequestEventItems,
  title: "UserEvents/PullRequestEventItems",
} satisfies Meta<typeof PullRequestEventItems>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    events: PullRequestEventFixture as PullRequestEvent[],
  },
};
