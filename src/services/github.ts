import { Octokit } from "@octokit/rest";
import chalk from "chalk";

import { config } from "../config.js";
import { logger } from "../utils/logger.js";
import type { GitHubRepoProperties } from "../types/index.js";

export async function createGitHubRepo(
  name: string,
  properties: GitHubRepoProperties,
): Promise<string> {
  const octokit = new Octokit({ auth: config.gitHubToken });

  try {
    logger.info(`Create new GitHub Repo: ${name}`);

    const response = await octokit.repos.createForAuthenticatedUser({
      name,
      private: properties.private ?? false,
      description: properties.description ?? "",
    });

    const repoURL = response.data.clone_url;

    logger.info(`GitHub Repo created: ${repoURL}`);
    console.log(chalk.green(`GitHub Repository created: ${repoURL}`));

    return repoURL;
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Error ocurred trying to create GitHub Repository: ${err.message}`);
      console.log(chalk.red("Error ocurred trying to create GitHub Repository."));
    }

    throw err;
  }
}
