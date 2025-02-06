import { faker } from "@faker-js/faker";
import { type Meta, type StoryObj } from "@storybook/react";

import DeleteEventFixture from "../../__fixtures__/DeleteEvent.fixture.json";
import { type DeleteEvent } from "../interface";
import { DeleteEventItems } from "./DeleteEventItems";

const meta = {
  component: DeleteEventItems,
  title: "UserEvents/DeleteEventItems",
} satisfies Meta<typeof DeleteEventItems>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    events: faker.helpers.shuffle(DeleteEventFixture as DeleteEvent[]),
  },
};
