import path from "path";
import fs from "fs";
import os from "os";

import chalk from "chalk";
import dotenv from "dotenv";

const configDir = path.join(os.homedir(), ".notionCli");

if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

const envPath = path.join(configDir, ".env");

if (!fs.existsSync(envPath)) {
  console.log(chalk.red(".env is missing."));
  process.exit(1);
}

dotenv.config({
  path: envPath,
});

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
