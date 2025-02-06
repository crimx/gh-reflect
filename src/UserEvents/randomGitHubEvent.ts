import { faker } from "@faker-js/faker";

import {
  type AuthorAssociation,
  type DeleteEvent,
  type GitHubEvent,
  type Issue,
  type IssuesEvent,
  type PullRequestEvent,
  type PushEvent,
  type Repository,
  type SimpleUser,
} from "./interface";

export function randomDeleteEvent(config: Partial<Omit<DeleteEvent, "type">> = {}): DeleteEvent {
  const { payload, ...base } = config;
  return {
    ...randomGitHubEventBase(base),
    payload: {
      pusher_type: "user",
      ref: faker.git.branch(),
      ref_type: "branch",
      ...payload,
    },
    type: "DeleteEvent",
  };
}

export function randomIssue(issue?: Partial<Issue>): Issue {
  return {
    active_lock_reason: null,
    assignee: faker.datatype.boolean() ? null : randomSimpleUser(),
    assignees: null,
    author_association: randomAuthorAssociation(),
    body: null,
    closed_at: faker.datatype.boolean() ? null : faker.date.past().toISOString(),
    comments: 0,
    comments_url: faker.internet.url(),
    created_at: faker.date.past().toISOString(),
    draft: faker.datatype.boolean(),
    events_url: faker.internet.url(),
    html_url: faker.internet.url(),
    id: Number(faker.string.numeric(10)),
    labels: [],
    labels_url: faker.internet.url(),
    locked: faker.datatype.boolean(),
    milestone: null,
    node_id: faker.string.uuid(),
    number: Number(faker.string.numeric(4)),
    repository_url: faker.internet.url(),
    state: faker.helpers.arrayElement(["open", "closed"]),
    state_reason: faker.helpers.arrayElement(["completed", "not_planned", "reopened", null]),
    title: faker.lorem.sentence(),
    updated_at: faker.date.past().toISOString(),
    url: faker.internet.url(),
    user: randomSimpleUser(),
    ...issue,
  };
}

export function randomIssuesEvent(config: Partial<Omit<IssuesEvent, "type">> = {}): IssuesEvent {
  const { payload, ...base } = config;
  return {
    ...randomGitHubEventBase(base),
    payload: {
      action: faker.helpers.arrayElement([
        "assigned",
        "closed",
        "edited",
        "labeled",
        "opened",
        "reopened",
        "unassigned",
        "unlabeled",
      ]),
      assignee: faker.datatype.boolean() ? randomSimpleUser() : undefined,
      issue: randomIssue(),
      ...payload,
    },
    type: "IssuesEvent",
  };
}

export function randomPullRequestEvent(config: Partial<Omit<PullRequestEvent, "type">> = {}): PullRequestEvent {
  const issue = Number(faker.string.numeric());
  const repo = `${faker.word.noun()}/${faker.word.noun()}`;
  const { payload, ...base } = config;
  return {
    ...randomGitHubEventBase(base),
    payload: {
      action: "closed",
      number: issue,
      pull_request: {
        _links: {
          comments: {
            href: `https://api.github.com/repos/${repo}/issues/${issue}/comments`,
          },
          commits: {
            href: `https://api.github.com/repos/${repo}/pulls/${issue}/commits`,
          },
          html: {
            href: `https://github.com/${repo}/pull/${issue}`,
          },
          issue: {
            href: `https://api.github.com/repos/${repo}/issues/${issue}`,
          },
          review_comment: {
            href: `https://api.github.com/repos/${repo}/pulls/comments{/number}`,
          },
          review_comments: {
            href: `https://api.github.com/repos/${repo}/pulls/${issue}/comments`,
          },
          self: {
            href: `https://api.github.com/repos/${repo}/pulls/${issue}`,
          },
          statuses: {
            href: `https://api.github.com/repos/${repo}/statuses/${faker.git.commitSha()}`,
          },
        },
        active_lock_reason: null,
        additions: faker.number.int(),
        assignee: null,
        assignees: [],
        author_association: "CONTRIBUTOR",
        auto_merge: {
          commit_message: faker.git.commitMessage(),
          commit_title: faker.git.commitMessage(),
          enabled_by: randomSimpleUser(),
          merge_method: "squash",
        },
        base: {
          label: faker.lorem.word(),
          ref: faker.git.branch(),
          repo: randomRepository(),
          sha: faker.git.commitSha(),
          user: randomSimpleUser(),
        },
        body: faker.lorem.sentence(),
        changed_files: faker.number.int({ max: 100, min: 0 }),
        closed_at: faker.date.past().toISOString(),
        comments: faker.number.int({ max: 100, min: 0 }),
        comments_url: faker.internet.url(),
        commits: faker.number.int({ max: 100, min: 0 }),
        commits_url: faker.internet.url(),
        created_at: faker.date.past().toISOString(),
        deletions: faker.number.int({ max: 100, min: 0 }),
        diff_url: faker.internet.url(),
        draft: faker.datatype.boolean(),
        head: {
          label: faker.lorem.sentence(),
          ref: faker.git.branch(),
          repo: randomRepository(),
          sha: faker.git.commitSha(),
          user: randomSimpleUser(),
        },
        html_url: faker.internet.url(),
        id: Number(faker.string.numeric(10)),
        issue_url: faker.internet.url(),
        labels: [
          {
            color: "ededed",
            default: false,
            description: null,
            id: Number(faker.string.numeric(10)),
            name: faker.lorem.word(),
            node_id: faker.string.uuid(),
            url: faker.internet.url(),
          },
        ],
        locked: faker.datatype.boolean(),
        maintainer_can_modify: faker.datatype.boolean(),
        merge_commit_sha: faker.git.commitSha(),
        mergeable: null,
        mergeable_state: "unknown",
        merged: faker.datatype.boolean(),
        merged_at: faker.date.past().toISOString(),
        merged_by: randomSimpleUser(),
        milestone: null,
        node_id: faker.string.uuid(),
        number: Number(faker.string.numeric(4)),
        patch_url: faker.internet.url(),
        rebaseable: null,
        requested_reviewers: [randomSimpleUser()],
        requested_teams: [],
        review_comment_url: faker.internet.url(),
        review_comments: faker.number.int({ max: 100, min: 0 }),
        review_comments_url: faker.internet.url(),
        state: "closed",
        statuses_url: faker.internet.url(),
        title: faker.lorem.sentence(),
        updated_at: faker.date.past().toISOString(),
        url: faker.internet.url(),
        user: randomSimpleUser(),
      },
      ...payload,
    },
    type: "PullRequestEvent",
  };
}

export function randomPushEvent(config: Partial<Omit<PushEvent, "type">> = {}): PushEvent {
  const { payload, ...base } = config;
  const commits = faker.helpers.uniqueArray(randomCommit, faker.number.int({ max: 5, min: 1 }));
  return {
    ...randomGitHubEventBase(base),
    payload: {
      before: faker.git.commitSha(),
      commits,
      distinct_size: commits.reduce((acc, commit) => acc + (commit.distinct ? 1 : 0), 0),
      head: faker.git.commitSha(),
      push_id: Number(faker.string.numeric(11)),
      ref: "refs/heads/main",
      repository_id: Number(faker.string.numeric(9)),
      size: commits.length,
      ...payload,
    },
    type: "PushEvent",
  };
}

function randomActor(): GitHubEvent["actor"] {
  const user = faker.word.noun();
  return {
    avatar_url: faker.image.avatarGitHub(),
    display_login: user,
    gravatar_id: "",
    id: Number(faker.string.numeric(7)),
    login: user,
    url: `https://api.github.com/users/${user}`,
  };
}

function randomAuthorAssociation(): AuthorAssociation {
  return faker.helpers.arrayElement([
    "CONTRIBUTOR",
    "COLLABORATOR",
    "FIRST_TIME_CONTRIBUTOR",
    "FIRST_TIMER",
    "MANNEQUIN",
    "MEMBER",
    "NONE",
    "OWNER",
  ]);
}

function randomCommit(): PushEvent["payload"]["commits"][number] {
  const sha = faker.git.commitSha();
  return {
    author: {
      email: faker.internet.email(),
      name: faker.word.noun(),
    },
    distinct: true,
    message: faker.git.commitMessage(),
    sha,
    url: `https://api.github.com/repos/${faker.word.noun()}/${faker.word.noun()}/commits/${sha}`,
  };
}

function randomGitHubEventBase(
  config?: Partial<Omit<GitHubEvent, "payload" | "type">>,
): Omit<GitHubEvent, "payload" | "type"> {
  return {
    actor: randomActor(),
    created_at: faker.date.past().toISOString(),
    id: faker.string.numeric(11),
    org: randomOrg(),
    public: faker.datatype.boolean(),
    repo: randomRepo(),
    ...config,
  };
}

function randomOrg(): GitHubEvent["org"] {
  const name = faker.word.noun();
  return {
    avatar_url: faker.image.avatarGitHub(),
    gravatar_id: "",
    id: Number(faker.string.numeric(9)),
    login: name,
    url: `https://api.github.com/orgs/${name}`,
  };
}

function randomRepo(): GitHubEvent["repo"] {
  const name = `${faker.lorem.word()}/${faker.lorem.word()}`;
  return {
    id: Number(faker.string.numeric(9)),
    name,
    url: `https://api.github.com/repos/${name}`,
  };
}

function randomRepository(repository?: Partial<Repository>): Repository {
  return {
    allow_forking: faker.datatype.boolean(),
    archive_url: faker.internet.url(),
    archived: faker.datatype.boolean(),
    assignees_url: faker.internet.url(),
    blobs_url: faker.internet.url(),
    branches_url: faker.internet.url(),
    clone_url: faker.internet.url(),
    collaborators_url: faker.internet.url(),
    comments_url: faker.internet.url(),
    commits_url: faker.internet.url(),
    compare_url: faker.internet.url(),
    contents_url: faker.internet.url(),
    contributors_url: faker.internet.url(),
    created_at: faker.date.past().toISOString(),
    default_branch: faker.git.branch(),
    deployments_url: faker.internet.url(),
    description: null,
    disabled: faker.datatype.boolean(),
    downloads_url: faker.internet.url(),
    events_url: faker.internet.url(),
    fork: faker.datatype.boolean(),
    forks: faker.number.int({ max: 10, min: 0 }),
    forks_count: faker.number.int({ max: 10, min: 0 }),
    forks_url: faker.internet.url(),
    full_name: faker.lorem.word(),
    git_commits_url: faker.internet.url(),
    git_refs_url: faker.internet.url(),
    git_tags_url: faker.internet.url(),
    git_url: faker.internet.url(),
    has_discussions: faker.datatype.boolean(),
    has_downloads: faker.datatype.boolean(),
    has_issues: faker.datatype.boolean(),
    has_pages: faker.datatype.boolean(),
    has_projects: faker.datatype.boolean(),
    has_wiki: faker.datatype.boolean(),
    homepage: null,
    hooks_url: faker.internet.url(),
    html_url: faker.internet.url(),
    id: Number(faker.string.numeric(9)),
    is_template: faker.datatype.boolean(),
    issue_comment_url: faker.internet.url(),
    issue_events_url: faker.internet.url(),
    issues_url: faker.internet.url(),
    keys_url: faker.internet.url(),
    labels_url: faker.internet.url(),
    language: "TypeScript",
    languages_url: faker.internet.url(),
    license: {
      key: "other",
      name: "Other",
      node_id: faker.string.nanoid(),
      spdx_id: faker.string.nanoid(),
      url: null,
    },
    merges_url: faker.internet.url(),
    milestones_url: faker.internet.url(),
    mirror_url: null,
    name: faker.lorem.word(),
    node_id: faker.string.nanoid(),
    notifications_url: faker.internet.url(),
    open_issues: faker.number.int({ max: 10, min: 0 }),
    open_issues_count: faker.number.int({ max: 10, min: 0 }),
    owner: randomSimpleUser(),
    private: faker.datatype.boolean(),
    pulls_url: faker.internet.url(),
    pushed_at: faker.date.past().toISOString(),
    releases_url: faker.internet.url(),
    size: faker.number.int({ max: 10000, min: 1000 }),
    ssh_url: faker.internet.url(),
    stargazers_count: faker.number.int({ max: 10, min: 0 }),
    stargazers_url: faker.internet.url(),
    statuses_url: faker.internet.url(),
    subscribers_url: faker.internet.url(),
    subscription_url: faker.internet.url(),
    svn_url: faker.internet.url(),
    tags_url: faker.internet.url(),
    teams_url: faker.internet.url(),
    topics: [],
    trees_url: faker.internet.url(),
    updated_at: faker.date.past().toISOString(),
    url: faker.internet.url(),
    visibility: faker.helpers.arrayElement(["private", "public"]),
    watchers: faker.number.int({ max: 10, min: 0 }),
    watchers_count: faker.number.int({ max: 10, min: 0 }),
    web_commit_signoff_required: faker.datatype.boolean(),
    ...repository,
  };
}

function randomSimpleUser(): SimpleUser {
  return {
    avatar_url: faker.image.avatarGitHub(),
    events_url: faker.internet.url(),
    followers_url: faker.internet.url(),
    following_url: faker.internet.url(),
    gists_url: faker.internet.url(),
    gravatar_id: null,
    html_url: faker.internet.url(),
    id: Number(faker.string.numeric(7)),
    login: faker.internet.username(),
    node_id: faker.string.uuid(),
    organizations_url: faker.internet.url(),
    received_events_url: faker.internet.url(),
    repos_url: faker.internet.url(),
    site_admin: faker.datatype.boolean(),
    starred_url: faker.internet.url(),
    subscriptions_url: faker.internet.url(),
    type: faker.lorem.word(),
    url: faker.internet.url(),
  };
}
