import { useObservableState } from "observable-hooks";
import { memo } from "react";
import { type Observable } from "rxjs";

import { Status } from "./Status";
import { type UseEventsFetchStatus, UserEvents } from "./UserEvents";

export interface ContentProps {
  status$: Observable<UseEventsFetchStatus>;
}

export const Content = /* @__PURE__ */ memo<ContentProps>(function Content({ status$ }) {
  const status = useObservableState(status$);

  return (
    <div>
      <div className="p4 font-mono">
        <Status status={status} />
      </div>
      <UserEvents status={status} />
    </div>
  );
});
