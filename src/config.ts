import dotenv from "dotenv";
dotenv.config();

interface Config {
  notionKeyProjects: string;
  notionKeySocialMedia: string;
  databaseIdProjects: string;
  databaseIdSocialMedia: string;
  gitHubToken: string;
  googleCredsPath: string;
  projectsRootId: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is missing`);
  }
  return value;
}

export const config: Config = {
  notionKeyProjects: requireEnv("NOTION_KEY"),
  notionKeySocialMedia: requireEnv("NOTION_KEY_SOCIAL_MEDIA"),
  databaseIdProjects: requireEnv("DATABASE_ID"),
  databaseIdSocialMedia: requireEnv("DATABASE_ID_SOCIAL_MEDIA"),
  gitHubToken: requireEnv("GITHUB_TOKEN"),
  googleCredsPath: requireEnv("GOOGLE_CREDS_PATH"),
  projectsRootId: requireEnv("DRIVE_ROOT_ID"),
};
