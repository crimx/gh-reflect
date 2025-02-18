import { type Meta, type StoryObj } from "@storybook/react";

import { DiffStat } from "./DiffStat";

const meta = {
  component: DiffStat,
  title: "UserEvents/DiffStat",
} satisfies Meta<typeof DiffStat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThreeOneOne: Story = {
  args: {
    additions: 17,
    deletions: 5,
  },
};

export const FourZeroOne: Story = {
  args: {
    additions: 6,
    deletions: 1,
  },
};

export const FourOneZero: Story = {
  args: {
    additions: 12,
    deletions: 3,
  },
};

export const TwoTwoOne: Story = {
  args: {
    additions: 1341,
    deletions: 1888,
  },
};

export const OneOneZero: Story = {
  args: {
    additions: 1,
    deletions: 1,
  },
};
