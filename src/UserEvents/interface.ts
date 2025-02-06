/** https://docs.github.com/en/rest/using-the-rest-api/github-event-types */

import {
  type CommitComment,
  type GitHubEvent,
  type Issue,
  type IssueComment,
  type Label,
  type PullRequest,
  type ReactionRollup,
  type Repository,
  type SimpleUser,
} from "./schema.interface";

export * from "./schema.interface";

/**
 * A commit comment is created.
 * The type of activity is specified in the action property of the payload object.
 * For more information, see [REST API endpoints for commit comments](https://docs.github.com/en/rest/commits/comments).
 */
export interface CommitCommentEvent extends GitHubEvent {
  payload: {
    /** 	The action performed. Can be `created`. */
    action: string;
    /** The commit comment resource. */
    comment: CommitComment;
  };
  type: "CommitCommentEvent";
}

/**
 * A Git branch or tag is created.
 * For more information, see [REST API endpoints for Git database](https://docs.github.com/en/rest/git#create-a-reference).
 */
export interface CreateEvent extends GitHubEvent {
  payload: {
    /** The repository's current description. */
    description: null | string;
    /**
     * The name of the repository's default branch (usually `main`).
     */
    master_branch: string;
    /**
     * Can be either `user` or a deploy key.
     */
    pusher_type: string;
    /**
     * 	The `git ref` resource, or `null` if `ref_type` is `repository`.
     * {@link https://docs.github.com/en/rest/git#get-a-reference}
     */
    ref: null | string;
    /**
     * The type of Git ref object created in the repository. Can be either `branch`, `tag`, or `repository`.
     */
    ref_type: "branch" | "repository" | "tag";
  };
  type: "CreateEvent";
}

/**
 * A Git branch or tag is deleted.
 * For more information, see the [REST API endpoints for Git database REST API](https://docs.github.com/en/rest/git#delete-a-reference).
 */
export interface DeleteEvent extends GitHubEvent {
  payload: {
    pusher_type: string;
    /** The `git ref` resource. */
    ref: string;
    /**
     * The type of Git ref object deleted in the repository. Can be either `branch` or `tag`.
     */
    ref_type: string;
  };
  type: "DeleteEvent";
}

/**
 * A user forks a repository.
 * For more information, see [REST API endpoints for repositories](https://docs.github.com/en/rest/repos#forks).
 */
export interface ForkEvent extends GitHubEvent {
  payload: {
    /** The created repository resource. */
    forkee: Repository;
  };
  type: "ForkEvent";
}

/**
 * A wiki page is created or updated.
 * For more information, see [About wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis).
 */
export interface GollumEvent extends GitHubEvent {
  payload: {
    /** The pages that were updated. */
    pages: Array<{
      /** The action that was performed on the page. Can be `created` or `edited`. */
      action: "created" | "edited";
      /** Points to the HTML wiki page. */
      html_url: string;
      /** The name of the page. */
      page_name: string;
      /** The latest commit SHA of the page. */
      sha: string;
      /** The current page title. */
      title: string;
    }>;
  };
  type: "GollumEvent";
}

/**
 * Activity related to an issue or pull request comment.
 * The type of activity is specified in the action property of the payload object.
 * For more information, see the [REST API endpoints for issues](https://docs.github.com/en/rest/issues#comments).
 */
export interface IssueCommentEvent extends GitHubEvent {
  payload: {
    /** The action that was performed on the comment. Can be one of `created`, `edited`, or `deleted`. */
    action: "created" | "deleted" | "edited";
    /** The comment itself. */
    comment: IssueComment;
    /** The issue the comment belongs to. */
    issue: Issue;
    /** The changes to the comment if the action was `edited`. */
    changes?: {
      body: {
        /** The previous version of the body if the action was `edited`. */
        from: string;
      };
    };
  };
  type: "IssueCommentEvent";
}

/**
 * Activity related to an issue.
 * The type of activity is specified in the action property of the payload object.
 * For more information, see the [REST API endpoints for issues](https://docs.github.com/en/rest/issues).
 */
export interface IssuesEvent extends GitHubEvent {
  payload: {
    /** The action that was performed. Can be one of `opened`, `edited`, `closed`, `reopened`, `assigned`, `unassigned`, `labeled`, or `unlabeled`. */
    action: "assigned" | "closed" | "edited" | "labeled" | "opened" | "reopened" | "unassigned" | "unlabeled";
    /** The issue the comment belongs to. */
    issue: Issue;
    /** The optional user who was assigned or unassigned from the issue. */
    assignee?: SimpleUser;
    /** The changes to the issue if the action was `edited`. */
    changes?: {
      body: {
        /** The previous version of the body if the action was `edited`. */
        from: string;
      };
      title: {
        /** The previous version of the title if the action was `edited`. */
        from: string;
      };
    };
    /** The optional label that was added or removed from the issue. */
    label?: Label;
  };
  type: "IssuesEvent";
}

/**
 * Activity related to repository collaborators.
 * The type of activity is specified in the action property of the payload object.
 * For more information, see [REST API endpoints for collaborators](https://docs.github.com/en/rest/collaborators/collaborators).
 */
export interface MemberEvent extends GitHubEvent {
  payload: {
    /** The action that was performed. Can be `added` to indicate a user accepted an invitation to a repository. */
    action: "added" | "edited";
    /** The user that was added. */
    member: SimpleUser;
    /** The changes to the collaborator permissions if the action was `edited`. */
    changes?: {
      old_permission: {
        /** The previous permissions of the collaborator if the action was `edited`. */
        from: string;
      };
    };
  };
  type: "MemberEvent";
}

/**
 * Activity related to pull requests.
 * The type of activity is specified in the action property of the payload object.
 * For more information, see [REST API endpoints for pull requests](https://docs.github.com/en/rest/pulls).
 */
export interface PullRequestEvent extends GitHubEvent {
  payload: {
    /** The action that was performed. Can be one of `opened`, `edited`, `closed`, `reopened`, `assigned`, `unassigned`, `review_requested`, `review_request_removed`, `labeled`, `unlabeled`, and `synchronize`. */
    action:
      | "assigned"
      | "closed"
      | "edited"
      | "labeled"
      | "opened"
      | "reopened"
      | "review_request_removed"
      | "review_requested"
      | "synchronize"
      | "unassigned"
      | "unlabeled";
    /** The pull request number. */
    number: number;
    /** The pull request itself. */
    pull_request: PullRequest;
    /** The changes to the comment if the action was `edited`. */
    changes?: {
      body: {
        /** The previous version of the body if the action was `edited`. */
        from: string;
      };
      title: {
        /** The previous version of the title if the action was `edited`. */
        from: string;
      };
    };
    /** The reason the pull request was removed from a merge queue if the action was `dequeued`. */
    reason?: string;
  };
  type: "PullRequestEvent";
}

/**
 * Activity related to pull request review comments in the pull request's unified diff.
 * The type of activity is specified in the action property of the payload object.
 * For more information, see [REST API endpoints for pull requests](https://docs.github.com/en/rest/pulls#comments).
 */
export interface PullRequestReviewCommentEvent extends GitHubEvent {
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

/**
 * Activity related to pull request reviews.
 * The type of activity is specified in the action property of the payload object.
 * For more information, see [REST API endpoints for pull requests](https://docs.github.com/en/rest/pulls#reviews).
 */
export interface PullRequestReviewEvent extends GitHubEvent {
  payload: {
    /** The action that was performed. Can be `created`. */
    action: "created";
    /** The pull request the review pertains to. */
    pull_request: PullRequest;
    /** The review that was affected. */
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

/**
 * Activity related to a comment thread on a pull request being marked as resolved or unresolved.
 * The type of activity is specified in the `action` property of the payload object.
 */
export interface PullRequestReviewThreadEvent extends GitHubEvent {
  payload: {
    /**
     * 	The action that was performed. Can be one of:
     *  - `resolved` - A comment thread on a pull request was marked as resolved.
     *  - `unresolved` - A previously resolved comment thread on a pull request was marked as unresolved.
     */
    action: "resolved" | "unresolved";
    /** The pull request the thread pertains to. */
    pull_request: PullRequest;
    /** The thread that was affected. */
    thread: object;
  };
  type: "PullRequestReviewThreadEvent";
}

/**
 * One or more commits are pushed to a repository branch or tag.
 */
export interface PushEvent extends GitHubEvent {
  payload: {
    before: string;
    /**
     * An array of commit objects describing the pushed commits.
     * The array includes a maximum of 20 commits.
     * If necessary, you can use the Commits API to fetch additional commits.
     * This limit is applied to timeline events only and isn't applied to webhook deliveries.
     */
    commits: Array<{
      author: {
        email: string;
        name: string;
      };
      /** Whether this commit is distinct from any that have been pushed before. */
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

/**
 * Activity related to a release. The type of activity is specified in the action property of the payload object.
 * For more information, see the [REST API endpoints for releases and release assets](https://docs.github.com/en/rest/releases) REST API.
 */
export interface ReleaseEvent extends GitHubEvent {
  payload: {
    /** The action that was performed. Can be published. */
    action: "edited" | "published";
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
    changes?: {
      body: {
        /** he previous version of the body if the action was `edited`. */
        from: string;
      };
      name: {
        /** The previous version of the name if the action was `edited`. */
        from: string;
      };
    };
  };
  type: "ReleaseEvent";
}

/**
 * When someone stars a repository.
 * The type of activity is specified in the action property of the payload object.
 * For more information, see [REST API endpoints for activity](https://docs.github.com/en/rest/activity#starring).
 */
export interface WatchEvent extends GitHubEvent {
  /** The action that was performed. Currently, can only be started. */
  action: "started";
  type: "WatchEvent";
}
