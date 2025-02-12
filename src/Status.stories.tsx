import { type Meta, type StoryObj } from "@storybook/react";
import { of } from "rxjs";

import { Status } from "./Status";
import { type UseEventsFetchStatus } from "./UserEvents";

const meta = {
  component: Status,
  title: "UserEvents/Status",
} satisfies Meta<typeof Status>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FetchingInit: Story = {
  args: {
    status$: of({ fetching: true, page: 0 } satisfies UseEventsFetchStatus),
  },
};

export const Fetching: Story = {
  args: {
    status$: of({ fetching: true, page: 1, eventsCount: 10 } satisfies UseEventsFetchStatus),
  },
};

export const Errored: Story = {
  args: {
    status$: of({
      fetching: false,
      page: 1,
      eventsCount: 10,
      error: new Error("Something is wrong"),
      remaining: 100,
      limit: 1000,
    } satisfies UseEventsFetchStatus),
  },
};

export const Success: Story = {
  args: {
    status$: of({
      fetching: false,
      page: 10,
      eventsCount: 10,
      remaining: 100,
      limit: 1000,
    } satisfies UseEventsFetchStatus),
  },
};
