// Basic Error class
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

// Notion Error
export class NotionError extends AppError {
  constructor(message: string, details?: unknown) {
    super("[NOTION_ERROR]", message, details);
  }
}

// GitHub Error
export class GitHubError extends AppError {
  constructor(message: string, details?: unknown) {
    super("[GITHUB_ERROR]", message, details);
  }
}

// Git Error
export class GitError extends AppError {
  constructor(message: string, details?: unknown) {
    super("[GIT_ERROR]", message, details);
  }
}
