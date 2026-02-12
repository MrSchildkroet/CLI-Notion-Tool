import chalk from "chalk";

import { config } from "../config.js";

import { showMainMenu } from "./index.js";

export async function showSettings(): Promise<void> {
  console.log("\n" + chalk.cyan.bold("Current Settings:\n"));

  const settings = [
    { label: "GitHub Token", value: config.gitHubToken ? "****...****" : "MISSING" },
    { label: "Notion Key (Projects)", value: config.notionKeyProjects ? "****...****" : "MISSING" },
    {
      label: "Notion Database ID (Projects)",
      value: config.databaseIdProjects ? "****...****" : "MISSING",
    },
    {
      label: "Notion Key (Social Media)",
      value: config.notionKeySocialMedia ? "****...****" : "MISSING",
    },
    {
      label: "Database ID (Social Media)",
      value: config.databaseIdSocialMedia ? "****...****" : "MISSING",
    },
  ];

  for (const s of settings) {
    const status = s.value ? chalk.green("OK") : chalk.red("MISSING");
    console.log(`${chalk.white(s.label)}: ${status}`);
  }

  console.log("\n");
  return showMainMenu();
}
