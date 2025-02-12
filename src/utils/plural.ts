const config = {
  commit: "commits",
  issue: "issues",
  repository: "repositories",
  "pull request": "pull requests",
  review: "reviews",
};

export const plural = (count: number, word: keyof typeof config): string =>
  `${count} ${(count > 1 && config[word]) || word}`;
