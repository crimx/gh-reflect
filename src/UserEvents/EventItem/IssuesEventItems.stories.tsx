import { faker } from "@faker-js/faker";
import { type Meta, type StoryObj } from "@storybook/react";

import { randomIssuesEvent } from "../randomGitHubEvent";
import { IssuesEventItems } from "./IssuesEventItems";

const meta = {
  component: IssuesEventItems,
  title: "UserEvents/IssuesEventItems",
} satisfies Meta<typeof IssuesEventItems>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    events: Array.from({ length: faker.number.int({ max: 20, min: 1 }) }, () => randomIssuesEvent()),
  },
};
