const config = {
  commit: "commits",
  comment: "comments",
  issue: "issues",
  repository: "repositories",
  "pull request": "pull requests",
  review: "reviews",
  page: "pages",
};

export const plural = (count: number, word: keyof typeof config): string =>
  `${count} ${(count > 1 && config[word]) || word}`;
