import { LogIcon } from "@primer/octicons-react";
import { Blankslate } from "@primer/react/experimental";

export const Empty = () => {
  return (
    <Blankslate>
      <Blankslate.Visual>
        <LogIcon size="medium" />
      </Blankslate.Visual>
      <Blankslate.Heading>Empty Event List</Blankslate.Heading>
      <Blankslate.Description>Start a new event fetching from the side panel.</Blankslate.Description>
    </Blankslate>
  );
};
