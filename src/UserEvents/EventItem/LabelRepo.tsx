import { Link } from "@primer/react";

export interface LabelRepoProps {
  repo: {
    name: string;
    url: string;
  };
}

export const LabelRepo = ({ repo }: LabelRepoProps) => {
  return (
    <Link className="underline text-inherit hover:color-[--fgColor-accent]" href={repo.url} target="_blank">
      {repo.name}
    </Link>
  );
};
