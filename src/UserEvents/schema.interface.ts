/**
 * Actor
 */
export interface Actor {
  avatar_url: string;
  gravatar_id: null | string;
  id: number;
  login: string;
  url: string;
  display_login?: string;
}
/**
 * How the author is associated with the repository.
 */
export type AuthorAssociation =
  | "COLLABORATOR"
  | "CONTRIBUTOR"
  | "FIRST_TIME_CONTRIBUTOR"
  | "FIRST_TIMER"
  | "MANNEQUIN"
  | "MEMBER"
  | "NONE"
  | "OWNER";
/**
 * An enterprise on GitHub.
 */
export interface Enterprise {
  avatar_url: string;
  created_at: null | string;
  html_url: string;
  /**
   * Unique identifier of the enterprise
   */
  id: number;
  /**
   * The name of the enterprise.
   */
  name: string;
  node_id: string;
  /**
   * The slug url identifier for the enterprise.
   */
  slug: string;
  updated_at: null | string;
  /**
   * A short description of the enterprise.
   */
  description?: null | string;
  /**
   * The enterprise's website URL.
   */
  website_url?: null | string;
}
/**
 * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
 */
export type GitHubApp = null | {
  created_at: string;
  description: null | string;
  /**
   * The list of events for the GitHub app
   */
  events: string[];
  external_url: string;
  html_url: string;
  /**
   * Unique identifier of the GitHub app
   */
  id: number;
  /**
   * The name of the GitHub app
   */
  name: string;
  node_id: string;
  owner: Enterprise | SimpleUser;
  /**
   * The set of permissions for the GitHub app
   */
  permissions: {
    checks?: string;
    contents?: string;
    deployments?: string;
    issues?: string;
    metadata?: string;
  };
  updated_at: string;
  client_id?: string;
  client_secret?: string;
  /**
   * The number of installations associated with the GitHub app
   */
  installations_count?: number;
  pem?: string;
  /**
   * The slug name of the GitHub app
   */
  slug?: string;
  webhook_secret?: null | string;
};
/**
 * Issues are a great way to keep track of tasks, enhancements, and bugs for your projects.
 */
export interface Issue {
  assignee: null | SimpleUser;
  author_association: AuthorAssociation;
  closed_at: null | string;
  comments: number;
  comments_url: string;
  created_at: string;
  events_url: string;
  html_url: string;
  id: number;
  /**
   * Labels to associate with this issue; pass one or more label names to replace the set of labels on this issue; send an empty array to clear all labels from the issue; note that the labels are silently dropped for users without push access to the repository
   */
  labels: (
    | string
    | {
        color?: null | string;
        default?: boolean;
        description?: null | string;
        id?: number;
        name?: string;
        node_id?: string;
        url?: string;
      }
  )[];
  labels_url: string;
  locked: boolean;
  milestone: Milestone | null;
  node_id: string;
  /**
   * Number uniquely identifying the issue within its repository
   */
  number: number;
  repository_url: string;
  /**
   * State of the issue; either 'open' or 'closed'
   */
  state: string;
  /**
   * Title of the issue
   */
  title: string;
  updated_at: string;
  /**
   * URL for the issue
   */
  url: string;
  user: null | SimpleUser;
  active_lock_reason?: null | string;
  assignees?: null | SimpleUser[];
  /**
   * Contents of the issue
   */
  body?: null | string;
  body_html?: string;
  body_text?: string;
  closed_by?: null | SimpleUser;
  draft?: boolean;
  performed_via_github_app?: GitHubApp | null;
  pull_request?: {
    diff_url: null | string;
    html_url: null | string;
    patch_url: null | string;
    url: null | string;
    merged_at?: null | string;
  };
  reactions?: ReactionRollup;
  repository?: Repository;
  /**
   * The reason for the current state
   */
  state_reason?: "completed" | "not_planned" | "reopened" | null;
  sub_issues_summary?: SubIssuesSummary;
  timeline_url?: string;
}
/**
 * Comments provide a way for people to collaborate on an issue.
 */
export interface IssueComment {
  author_association: AuthorAssociation;
  created_at: string;
  html_url: string;
  /**
   * Unique identifier of the issue comment
   */
  id: number;
  issue_url: string;
  node_id: string;
  updated_at: string;
  /**
   * URL for the issue comment
   */
  url: string;
  user: null | SimpleUser;
  /**
   * Contents of the issue comment
   */
  body?: string;
  body_html?: string;
  body_text?: string;
  performed_via_github_app?: GitHubApp | null;
  reactions?: ReactionRollup;
}
/**
 * License Simple
 */
export interface LicenseSimple {
  key: string;
  name: string;
  node_id: string;
  spdx_id: null | string;
  url: null | string;
  html_url?: string;
}

/**
 * A collection of related issues and pull requests.
 */
export interface Milestone {
  closed_at: null | string;
  closed_issues: number;
  created_at: string;
  creator: null | SimpleUser;
  description: null | string;
  due_on: null | string;
  html_url: string;
  id: number;
  labels_url: string;
  node_id: string;
  /**
   * The number of the milestone.
   */
  number: number;
  open_issues: number;
  /**
   * The state of the milestone.
   */
  state: "closed" | "open";
  /**
   * The title of the milestone.
   */
  title: string;
  updated_at: string;
  url: string;
}
export interface ReactionRollup {
  "-1": number;
  "+1": number;
  confused: number;
  eyes: number;
  heart: number;
  hooray: number;
  laugh: number;
  rocket: number;
  total_count: number;
  url: string;
}
/**
 * A repository on GitHub.
 */
export interface Repository {
  archive_url: string;
  /**
   * Whether the repository is archived.
   */
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: null | string;
  /**
   * The default branch of the repository.
   */
  default_branch: string;
  deployments_url: string;
  description: null | string;
  /**
   * Returns whether or not this repository disabled.
   */
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks: number;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  /**
   * @deprecated
   * Whether downloads are enabled.
   */
  has_downloads: boolean;
  /**
   * Whether issues are enabled.
   */
  has_issues: boolean;
  has_pages: boolean;
  /**
   * Whether projects are enabled.
   */
  has_projects: boolean;
  /**
   * Whether the wiki is enabled.
   */
  has_wiki: boolean;
  homepage: null | string;
  hooks_url: string;
  html_url: string;
  /**
   * Unique identifier of the repository
   */
  id: number;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: null | string;
  languages_url: string;
  license: LicenseSimple | null;
  merges_url: string;
  milestones_url: string;
  mirror_url: null | string;
  /**
   * The name of the repository.
   */
  name: string;
  node_id: string;
  notifications_url: string;
  open_issues: number;
  open_issues_count: number;
  owner: SimpleUser;
  /**
   * Whether the repository is private or public.
   */
  private: boolean;
  pulls_url: string;
  pushed_at: null | string;
  releases_url: string;
  /**
   * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
   */
  size: number;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  updated_at: null | string;
  url: string;
  watchers: number;
  watchers_count: number;
  /**
   * Whether to allow Auto-merge to be used on pull requests.
   */
  allow_auto_merge?: boolean;
  /**
   * Whether to allow forking this repo
   */
  allow_forking?: boolean;
  /**
   * Whether to allow merge commits for pull requests.
   */
  allow_merge_commit?: boolean;
  /**
   * Whether to allow rebase merges for pull requests.
   */
  allow_rebase_merge?: boolean;
  /**
   * Whether to allow squash merges for pull requests.
   */
  allow_squash_merge?: boolean;
  /**
   * Whether or not a pull request head branch that is behind its base branch can always be updated even if it is not required to be up to date before merging.
   */
  allow_update_branch?: boolean;
  /**
   * Whether anonymous git access is enabled for this repository
   */
  anonymous_access_enabled?: boolean;
  /**
   * Whether to delete head branches when pull requests are merged
   */
  delete_branch_on_merge?: boolean;
  /**
   * Whether discussions are enabled.
   */
  has_discussions?: boolean;
  /**
   * Whether this repository acts as a template that can be used to generate new repositories.
   */
  is_template?: boolean;
  master_branch?: string;
  /**
   * The default value for a merge commit message.
   *
   * - `PR_TITLE` - default to the pull request's title.
   * - `PR_BODY` - default to the pull request's body.
   * - `BLANK` - default to a blank commit message.
   */
  merge_commit_message?: "BLANK" | "PR_BODY" | "PR_TITLE";
  /**
   * The default value for a merge commit title.
   *
   * - `PR_TITLE` - default to the pull request's title.
   * - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).
   */
  merge_commit_title?: "MERGE_MESSAGE" | "PR_TITLE";
  permissions?: {
    admin: boolean;
    pull: boolean;
    push: boolean;
    maintain?: boolean;
    triage?: boolean;
  };
  /**
   * The default value for a squash merge commit message:
   *
   * - `PR_BODY` - default to the pull request's body.
   * - `COMMIT_MESSAGES` - default to the branch's commit messages.
   * - `BLANK` - default to a blank commit message.
   */
  squash_merge_commit_message?: "BLANK" | "COMMIT_MESSAGES" | "PR_BODY";
  /**
   * The default value for a squash merge commit title:
   *
   * - `PR_TITLE` - default to the pull request's title.
   * - `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).
   */
  squash_merge_commit_title?: "COMMIT_OR_PR_TITLE" | "PR_TITLE";
  starred_at?: string;
  temp_clone_token?: string;
  topics?: string[];
  /**
   * @deprecated
   * Whether a squash merge commit can use the pull request title as default. **This property is closing down. Please use `squash_merge_commit_title` instead.
   */
  use_squash_pr_title_as_default?: boolean;
  /**
   * The repository visibility: public, private, or internal.
   */
  visibility?: string;
  /**
   * Whether to require contributors to sign off on web-based commits
   */
  web_commit_signoff_required?: boolean;
}
/**
 * A GitHub user.
 */
export interface SimpleUser {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: null | string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
  email?: null | string;
  name?: null | string;
  starred_at?: string;
  user_view_type?: string;
}
export interface SubIssuesSummary {
  completed: number;
  percent_completed: number;
  total: number;
}
/**
 * UserEvent
 */
export interface UserEvent {
  actor: Actor;
  created_at: null | string;
  id: string;
  payload: unknown;
  // payload: {
  //   action?: string;
  //   comment?: IssueComment;
  //   issue?: Issue;
  //   pages?: {
  //     action?: string;
  //     html_url?: string;
  //     page_name?: string;
  //     sha?: string;
  //     summary?: null | string;
  //     title?: string;
  //   }[];
  // };
  public: boolean;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  type: null | string;
  org?: Actor;
}
