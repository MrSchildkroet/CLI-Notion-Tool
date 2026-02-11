import chalk from "chalk";

import { config } from "../config.js";

import { showMainMenu } from "./index.js";

export async function showSettings(): Promise<void> {
  console.log("\n" + chalk.cyan.bold("Current Settings:\n"));

  const settings = [
    { label: "GitHub Token", value: config.gitHubToken },
    { label: "Notion Key (Projects)", value: config.notionKeyProjects },
    {
      label: "Notion Database ID (Projects)",
      value: config.databaseIdProjects,
    },
    { label: "Notion Key (Social Media)", value: config.notionKeySocialMedia },
    {
      label: "Database ID (Social Media)",
      value: config.databaseIdSocialMedia,
    },
  ];

  for (const s of settings) {
    const status = s.value ? chalk.green("OK") : chalk.red("MISSING");
    console.log(`${chalk.white(s.label)}: ${status}`);
  }

  console.log("\n");
  return showMainMenu();
}
