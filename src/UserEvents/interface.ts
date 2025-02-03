import {
  type Issue,
  type IssueComment,
  type ReactionRollup,
  type Repository,
  type SimpleUser,
  type UserEvent,
} from "./schema.interface";

export * from "./schema.interface";

export interface CreateEvent extends UserEvent {
  payload: {
    description: null | string;
    master_branch: string;
    pusher_type: string;
    ref: null | string;
    ref_type: string;
  };
  type: "CreateEvent";
}

export interface DeleteEvent extends UserEvent {
  payload: {
    pusher_type: string;
    ref: string;
    ref_type: string;
  };
  type: "DeleteEvent";
}

export interface IssueCommentEvent extends UserEvent {
  payload: {
    action: "created";
    comment: IssueComment;
    issue: Issue;
  };
  type: "IssueCommentEvent";
}

export interface PullRequest {
  _links: {
    comments: {
      href: string;
    };
    commits: {
      href: string;
    };
    html: {
      href: string;
    };
    issue: {
      href: string;
    };
    review_comment: {
      href: string;
    };
    review_comments: {
      href: string;
    };
    self: {
      href: string;
    };
    statuses: {
      href: string;
    };
  };
  active_lock_reason: null | string;
  additions: number;
  assignee: null | string;
  assignees: string[];
  author_association: string;
  auto_merge: {
    commit_message: string;
    commit_title: string;
    enabled_by: SimpleUser;
    merge_method: string;
  };
  base: {
    label: string;
    ref: string;
    repo: Repository;
    sha: string;
    user: SimpleUser;
  };
  body: null | string;
  changed_files: number;
  closed_at: string;
  comments: number;
  comments_url: string;
  commits: number;
  commits_url: string;
  created_at: string;
  deletions: number;
  diff_url: string;
  draft: boolean;
  head: {
    label: string;
    ref: string;
    repo: Repository;
    sha: string;
    user: SimpleUser;
  };
  html_url: string;
  id: number;
  issue_url: string;
  labels:
    | string
    | {
        color: string;
        default: boolean;
        description: null | string;
        id: number;
        name: string;
        node_id: string;
        url: string;
      }[];
  locked: boolean;
  maintainer_can_modify: boolean;
  merge_commit_sha: string;
  mergeable: boolean | null;
  mergeable_state: string;
  merged: boolean;
  merged_at: string;
  merged_by: SimpleUser;
  milestone: null | string;
  node_id: string;
  number: number;
  patch_url: string;
  rebaseable: boolean | null;
  requested_reviewers: SimpleUser[];
  requested_teams: unknown[];
  review_comment_url: string;
  review_comments: number;
  review_comments_url: string;
  state: string;
  statuses_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: SimpleUser;
}

export interface PullRequestEvent extends UserEvent {
  payload: {
    action: string;
    number: number;
    pull_request: PullRequest;
  };
  type: "PullRequestEvent";
}

export interface PullRequestReviewCommentEvent extends UserEvent {
  payload: {
    action: string;
    comment: {
      _links: {
        html: {
          href: string;
        };
        pull_request: {
          href: string;
        };
        self: {
          href: string;
        };
      };
      author_association: string;
      body: string;
      commit_id: string;
      created_at: string;
      diff_hunk: string;
      html_url: string;
      id: number;
      line: number;
      node_id: string;
      original_commit_id: string;
      original_line: number;
      original_position: number;
      original_start_line: null | number;
      path: string;
      position: number;
      pull_request_review_id: number;
      pull_request_url: string;
      reactions: ReactionRollup;
      side: string;
      start_line: null | number;
      start_side: null | number;
      subject_type: string;
      updated_at: string;
      url: string;
      user: SimpleUser;
    };
    pull_request: PullRequest;
  };
  type: "PullRequestReviewCommentEvent";
}

export interface PullRequestReviewEvent extends UserEvent {
  payload: {
    action: string;
    pull_request: PullRequest;
    review: {
      _links: {
        html: {
          href: string;
        };
        pull_request: {
          href: string;
        };
      };
      author_association: string;
      body: null | string;
      commit_id: string;
      html_url: string;
      id: number;
      node_id: string;
      pull_request_url: string;
      state: string;
      submitted_at: string;
      user: SimpleUser;
    };
  };
  type: "PullRequestReviewEvent";
}

export interface PushEvent extends UserEvent {
  payload: {
    before: string;
    commits: Array<{
      author: {
        email: string;
        name: string;
      };
      distinct: boolean;
      message: string;
      sha: string;
      url: string;
    }>;
    distinct_size: number;
    head: string;
    push_id: number;
    ref: string;
    repository_id: number;
    size: number;
  };
  type: "PushEvent";
}

export interface ReleaseEvent extends UserEvent {
  payload: {
    action: string;
    release: {
      assets: unknown[];
      assets_url: string;
      author: SimpleUser;
      body: null | string;
      created_at: string;
      draft: boolean;
      html_url: string;
      id: number;
      is_short_description_html_truncated: boolean;
      name: string;
      node_id: string;
      prerelease: boolean;
      published_at: string;
      short_description_html: string;
      tag_name: string;
      tarball_url: string;
      target_commitish: string;
      upload_url: string;
      url: string;
      zipball_url: string;
    };
  };
  type: "ReleaseEvent";
}
