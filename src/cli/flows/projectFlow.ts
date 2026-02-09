import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

import type { ProjectFlowAnswers } from "../../types/index.js";

import { logger } from "../../utils/logger.js";
import { createGitHubRepo } from "../../services/github.js";
import { pushToGitHub } from "../../services/gitops.js";
import { createNotionEntry } from "../../services/notion/projectPage.js";
import { createMinecraftFolder } from "./minecraftFlow.js";
import { authorize, createFolder } from "../../services/drive/drive.js";
import { config } from "../../config.js";

import { showMainMenu } from "../index.js";

export async function projectFlow(): Promise<void> {
  console.log(chalk.cyan("\nNew Project\n"));

  // 1. Inquirer prompts
  const answers = await inquirer.prompt<ProjectFlowAnswers>([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      validate: (v) => v.length > 0 || "Please enter a project name.",
    },
    {
      type: "select",
      name: "priority",
      message: "Priority of the Project:",
      choices: [
        { name: "High", value: "high" },
        { name: "Medium", value: "medium" },
        { name: "Low", value: "low" },
      ],
    },
    {
      type: "select",
      name: "status",
      message: "Status of the Project:",
      choices: [
        { name: "Not Started", value: "Not started" },
        { name: "In Progress", value: "In progress" },
        { name: "Done", value: "Done" },
      ],
    },
    {
      type: "input",
      name: "endDate",
      message: "Deadline of the Project:",
      validate: (v) =>
        v.length > 0 || "Please enter a deadline in the format: YYYY-MM-DD.",
    },
    {
      type: "input",
      name: "projectPath",
      message: "Path to the local project folder:",
      validate: (v) => v.length > 0 || "Please enter a valid path.",
    },
    {
      type: "confirm",
      name: "createMinecraftFolder",
      message: "Do you want to create a BP & RP folder for Minecraft Bedrock?",
      default: false,
    },
  ]);

  const { projectName, priority, status, endDate, projectPath } = answers;

  const startDate = new Date().toISOString();

  // 2. Create GitHub Repo
  console.log(chalk.yellow("\nCreate new GitHub Repository..."));
  logger.info(`Creating new GitHub Repository for ${projectName}`);

  const repoURL = await createGitHubRepo(projectName, { private: false });

  // 3. Create Notion Entry
  console.log(chalk.yellow("\nCreate new Notion entry..."));
  logger.info(`Creating new Notion entry for ${projectName}`);

  await createNotionEntry({
    title: projectName,
    priority,
    repoURL,
    status,
    startDate,
    endDate,
  });

  // 4. Create Minecraft Folders (optional)
  if (answers.createMinecraftFolder) {
    console.log(chalk.yellow("\nCreate Minecraft Folders..."));
    createMinecraftFolder({ projectName });
    logger.info(`Creating Minecraft folders for ${projectName}`);
  }

  // 5. Push to GitHub
  console.log(chalk.yellow("\nPushing local Project to GitHub..."));
  logger.info(
    `Pushing local Project ${projectName} (${projectPath}) to GitHub`,
  );
  await pushToGitHub(projectPath, repoURL);

  // 6. Create Google Drive Folders
  console.log(chalk.yellow("\nCreate new Google Drive folders..."));
  logger.info(`Create new Google Drive folders for ${projectName}`);

  const projectsRootID = config.projectsRootId;
  let driveFolderId: string | undefined;

  await new Promise<void>((resolve) => {
    authorize(async (auth: any) => {
      driveFolderId = await createFolder(auth, projectName, projectsRootID);

      fs.writeFileSync(
        path.join(projectPath, ".drive.json"),
        JSON.stringify({ driveFolderId }, null, 2),
      );

      resolve();
    });
  });

  // 7. Finished
  logger.info(`Project ${projectName} created successfully.`);
  console.log(chalk.green("\nProject created successfully!"));
  console.log(chalk.blueBright(`GitHub Repo URL: ${repoURL}`));

  return showMainMenu();
}
