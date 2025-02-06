import styles from "./EventItemLayout.module.scss";

import { FoldIcon, UnfoldIcon } from "@primer/octicons-react";
import { Timeline } from "@primer/react";
import { type ReactElement, type ReactNode, useState } from "react";

export interface EventItemLayoutProps {
  head: ReactNode;
  icon: ReactElement;
  children?: ReactNode;
}

export const EventItemLayout = ({ children, head, icon }: EventItemLayoutProps) => {
  return (
    <Timeline.Item>
      <Timeline.Badge>{icon}</Timeline.Badge>
      <Timeline.Body>
        <div className={styles.container}>
          <div className={styles.head}>{head}</div>
        </div>
        {children}
      </Timeline.Body>
    </Timeline.Item>
  );
};

export interface EventItemLayoutExpandableProps {
  head: ReactNode;
  icon: ReactElement;
  children?: () => ReactNode;
}

export const EventItemLayoutExpandable = ({ children, head, icon }: EventItemLayoutExpandableProps) => {
  const [expanded, setExpand] = useState(false);
  return (
    <Timeline.Item>
      <Timeline.Badge>{icon}</Timeline.Badge>
      <Timeline.Body>
        <button
          className={`${styles.container} mt-[4px]`}
          onClick={e => {
            if (!(e.target as Element).closest?.("a")) {
              setExpand(expanded => !expanded);
            }
          }}
        >
          <div className={styles.head}>{head}</div>
          {expanded ? <FoldIcon /> : <UnfoldIcon />}
        </button>
        {expanded && children?.()}
      </Timeline.Body>
    </Timeline.Item>
  );
};
