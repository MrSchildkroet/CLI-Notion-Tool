// Main Menu Actions
export type MainMenuAction = "new" | "social_media" | "settings" | "exit";

// Project Flow
export interface ProjectFlowAnswers {
  projectName: string;
  priority: "high" | "medium" | "low";
  status: "Not started" | "In progress" | "Done";
  endDate: string; // YYYY-MM-DD
  projectPath: string;
  createMinecraftFolder: boolean;
}

export interface ProjectFlowResult {
  repoURL: string;
  notionPageId?: string;
  driveFolderId?: string;
}

// Social Media Post Flow
export interface PostFlowAnswers {
  postTitle: string;
  postDescription: string;
  platform: string;
  postDate: string; // YYYY-MM-DD
}

// Notion Properties
export interface NotionProjectProperties {
  title: string;
  priority: string;
  repoURL: string;
  status: string;
  startDate: string;
  endDate: string;
}

export interface NotionPostProperties {
  title: string;
  description: string;
  platform: string;
  date: string;
}

// GitHub
export interface GitHubRepoProperties {
  description?: string;
  private?: boolean;
}

export interface GitHubRepoResult {
  url: string;
}

// Git Operations
export interface GitPushProperties {
  projectPath: string;
  repoURL: string;
}

// Google Drive
export interface DriveFolderInfo {
  id: string;
  name: string;
  parentId?: string;
}

// Python
export interface PythonExportProperties {
  title: string;
  platform: string;
  date: string;
}

// Minecraft Folder Creation
export interface MinecraftFolderOptions {
  projectName: string;
}
