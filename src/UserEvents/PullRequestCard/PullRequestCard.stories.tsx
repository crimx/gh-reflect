import { faker } from "@faker-js/faker";
import { type Meta, type StoryObj } from "@storybook/react";

import PullRequestEventFixture from "../../__fixtures__/PullRequestEvent.fixture.json";
import { type PullRequestEvent } from "../interface";
import { PullRequestCard } from "./PullRequestCard";

const meta = {
  component: PullRequestCard,
  title: "UserEvents/PullRequestCard",
  decorators: [
    Story => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PullRequestCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    event: faker.helpers.arrayElement(PullRequestEventFixture as PullRequestEvent[]),
  },
};
