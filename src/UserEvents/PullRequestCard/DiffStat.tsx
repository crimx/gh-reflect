import styles from "./DiffStat.module.scss";

import { clsx } from "clsx";
import { memo } from "react";

export interface DiffStatProps {
  additions: number;
  deletions: number;
}

const GRAPH_WIDTH = 5;

export const DiffStat = /* @__PURE__ */ memo(function DiffStat({ additions, deletions }: DiffStatProps) {
  let added = additions;
  let removed = deletions;
  const total = additions + deletions;

  if (GRAPH_WIDTH < total) {
    added = scaleLinear(additions, GRAPH_WIDTH, total);
    removed = scaleLinear(deletions, GRAPH_WIDTH, total);
  }

  return (
    <span className="text-xs color-[--fgColor-muted] whitespace-nowrap font-600 cursor-default">
      <span className="color-[--fgColor-success]"> +{additions} </span>{" "}
      <span className={`color-[--fgColor-danger] ${styles.darkDangerVisualFix}`}> -{deletions} </span>{" "}
      {Array.from({ length: GRAPH_WIDTH }, (_, i) => (
        <span
          key={i}
          className={clsx(
            "w-2 h-2 ml-[1px] inline-block",
            i < added
              ? "bg-[--bgColor-success-emphasis]"
              : i < added + removed
                ? `bg-[--bgColor-danger-emphasis] ${styles.darkDangerVisualFix}`
                : "bg-[--bgColor-neutral-muted]",
          )}
        />
      ))}{" "}
      lines changed
    </span>
  );
});

const scaleLinear = (value: number, width: number, changed: number): number => value && ((value * width) / changed) | 0;
