import { faker } from "@faker-js/faker";
import { ReportIcon } from "@primer/octicons-react";
import { action } from "@storybook/addon-actions";
import { type Meta, type StoryObj } from "@storybook/react";

import { EventItemLayoutExpandable } from "./EventItemLayout";

const meta = {
  component: EventItemLayoutExpandable,
  decorators: [
    Story => {
      return <div className="w-sm">{Story()}</div>;
    },
  ],
  title: "UserEvents/EventItemLayoutExpandable",
} satisfies Meta<typeof EventItemLayoutExpandable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    children: () => {
      action("bodyRendered")();
      return (
        <>
          {Array.from({ length: 5 }).map(() => (
            <p>{faker.lorem.paragraph()}</p>
          ))}
        </>
      );
    },
    head: faker.lorem.words(),
    icon: <ReportIcon />,
  },
};

export const LongText: Story = {
  args: {
    children: () => {
      action("bodyRendered")();
      return (
        <>
          {Array.from({ length: 5 }).map(() => (
            <p>{faker.lorem.paragraph()}</p>
          ))}
        </>
      );
    },
    head: faker.lorem.sentence(100),
    icon: <ReportIcon />,
  },
};
