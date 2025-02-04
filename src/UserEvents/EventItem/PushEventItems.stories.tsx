import { faker } from "@faker-js/faker";
import { type Meta, type StoryObj } from "@storybook/react";

import PushEventFixture from "../../__fixtures__/PushEvent.fixture.json";
import { type PushEvent } from "../interface";
import { PushEventItems } from "./PushEventItems";

const meta = {
  component: PushEventItems,
  title: "UserEvents/PushEventItems",
} satisfies Meta<typeof PushEventItems>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    events: faker.helpers.shuffle(PushEventFixture as PushEvent[]),
  },
};
