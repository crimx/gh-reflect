import { faker } from "@faker-js/faker";
import { ReportIcon } from "@primer/octicons-react";
import { type Meta, type StoryObj } from "@storybook/react";

import { EventItemLayout } from "./EventItemLayout";

const meta = {
  component: EventItemLayout,
  decorators: [
    Story => {
      return <div className="w-sm">{Story()}</div>;
    },
  ],
  title: "UserEvents/EventItemLayout",
} satisfies Meta<typeof EventItemLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    children: <pre>{faker.lorem.paragraphs()}</pre>,
    head: faker.lorem.words(),
    icon: <ReportIcon />,
  },
};

export const LongText: Story = {
  args: {
    head: faker.lorem.sentence(100),
    icon: <ReportIcon />,
  },
};
