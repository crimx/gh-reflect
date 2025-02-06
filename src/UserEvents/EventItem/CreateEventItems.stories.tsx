import { faker } from "@faker-js/faker";
import { type Meta, type StoryObj } from "@storybook/react";

import CreateEventFixture from "../../__fixtures__/CreateEvent.fixture.json";
import { type CreateEvent } from "../interface";
import { CreateEventItems } from "./CreateEventItems";

const meta = {
  component: CreateEventItems,
  title: "UserEvents/CreateEventItems",
} satisfies Meta<typeof CreateEventItems>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    events: faker.helpers.shuffle(CreateEventFixture as CreateEvent[]),
  },
};
