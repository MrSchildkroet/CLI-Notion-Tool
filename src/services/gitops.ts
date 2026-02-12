import { execSync } from "child_process";
import path from "path";

import fs from "fs-extra";
import chalk from "chalk";

import { logger } from "../utils/logger.js";
import { GITIGNORE_CONTENT } from "../constants.js";
import { GitError } from "../types/errors.js";

function run(command: string, cwd: string) {
  try {
    logger.info(`Running command: ${command}`);
    execSync(command, { cwd, stdio: "inherit" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Git command failed: ${command} - ${err.message}`);
    }

    throw new Error(`Git command failed: ${command}`);
  }
}

function safeRun(command: string, cwd: string) {
  try {
    run(command, cwd);
  } catch {
    logger.warn(`Ignored error: ${command}`);
  }
}

function createGitignore(projectPath: string): void {
  console.log(chalk.yellow("Creating .gitignore..."));

  const content = [GITIGNORE_CONTENT, "*.mcpack", "*.mcworld", "*.mcfunction", "*.mcaddon"].join(
    "\n",
  );
  try {
    const gitignorePath = path.join(projectPath, ".gitignore");
    fs.writeFileSync(gitignorePath, content.trim());
    logger.info(`.gitignore created successfully: ${gitignorePath}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new GitError(err.message, err);
    }

    throw new GitError("Unknown Git error", err);
  }
}

export async function pushToGitHub(projectPath: string, repoURL: string): Promise<void> {
  try {
    execSync("git --version", { stdio: "ignore" });
  } catch {
    logger.fatal("Git is not installed. Exiting process.");
    throw new Error("Git is not installed.");
  }

  try {
    logger.info(`Starting Git Push for Project: ${projectPath}`);

    if (!fs.existsSync(projectPath)) {
      logger.error(`Project path does not exist: ${projectPath}`);
      throw new Error(`Project path does not exist: ${projectPath}`);
    }

    const gitFolder = path.join(projectPath, ".git");

    // Creating .gitignore
    createGitignore(projectPath);

    // 1. Initializing Git (if necessary)
    if (!fs.existsSync(gitFolder)) {
      console.log(chalk.yellow("Initializing Git Repository..."));
      run("git init", projectPath);
    }

    // 2. Set remote
    console.log(chalk.yellow("Setting GitHub Repo Remote..."));
    safeRun(`git remote remove origin`, projectPath);
    run(`git remote add origin ${repoURL}`, projectPath);

    // 3. Add files
    console.log(chalk.yellow("Creating Commit..."));
    run(`git add .`, projectPath);

    // 4. Creating commit
    console.log(chalk.yellow("Pushing to GitHub..."));
    safeRun(`git commit -m "Initial commit"`, projectPath);

    // 5. Pushing to GitHub
    console.log(chalk.yellow("Pushing to GitHub..."));
    run("git branch -M main", projectPath);
    run("git push -u origin main", projectPath);

    logger.info(`Git Repository successfully pushed to GitHub: ${repoURL}`);
    console.log(chalk.green("Project successfully pushed to GitHub!"));
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Git push failed: ${err.message}`);
      console.log(chalk.red("Git push failed."));
    }

    throw err;
  }
}
