import inquirer from "inquirer";
import chalk from "chalk";

import type { PostFlowAnswers } from "../../types/index.js";

import { logger } from "../../utils/logger.js";
import { createSocialMediaEntry } from "../../services/notion/socialMediaPage.js";
import { runPythonExport } from "../../services/python/exporter.js";

import { showMainMenu } from "../index.js";

export async function postFlow(): Promise<void> {
  console.log(chalk.cyan("\nNew Social Media Post\n"));

  // 1. Inquirer Prompts
  const answers = await inquirer.prompt<PostFlowAnswers>([
    {
      type: "input",
      name: "postTitle",
      message: "Title of the Social Media Post:",
      validate: (v) => v.length > 0 || "Please enter a title.",
    },
    {
      type: "input",
      name: "postDescription",
      message: "Description of the Social Media Posts:",
      validate: (v) => v.length > 0 || "Please enter a description.",
    },
    {
      type: "input",
      name: "platform",
      message: "Platform (f.e. YouTube, Instagram, etc.):",
      validate: (v) => v.length > 0 || "Please enter a platform.",
    },
    {
      type: "input",
      name: "postDate", // YYYY-MM-DD
      message: "Planed post date: YYYY-MM-DD",
      validate: (v) => v.length > 0 || "Please enter a date.",
    },
  ]);

  const { postTitle, postDescription, platform, postDate } = answers;

  // 2. Create Notion entry
  console.log(chalk.yellow("\n Creating new Notion entry..."));
  logger.info(`Creating new Social Media Notion entry: ${postTitle}`);

  await createSocialMediaEntry({
    title: postTitle,
    description: postDescription,
    platform: platform,
    date: postDate,
  });

  // 3. Python export
  console.log(chalk.yellow("Exporting to Excel..."));
  logger.info(`Starting Python export to Excel for: ${postTitle}`);

  await runPythonExport({
    title: postTitle,
    platform: platform,
    date: postDate,
  });

  // 4. Finished
  console.log(chalk.green("\nSocial Media Post created successfully."));
  logger.info(`Social Media Post created successfully: ${postTitle}`);

  return showMainMenu();
}
