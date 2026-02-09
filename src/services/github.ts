import { Octokit } from "octokit";
import chalk from "chalk";
import { config } from "../config.js";
import { logger } from "../utils/logger.js";
import type { GitHubRepoProperties, GitHubRepoResult } from "../types/index.js";

const octokit = new Octokit({
  auth: config.gitHubToken,
});

export async function createGitHubRepo(
  name: string,
  properties: GitHubRepoProperties,
): Promise<string> {
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
  } catch (err: any) {
    logger.error(
      `Error ocurred trying to create GitHub Repository: ${err.message}`,
    );
    console.log(chalk.red("Error ocurred trying to create GitHub Repository."));
    throw err;
  }
}
