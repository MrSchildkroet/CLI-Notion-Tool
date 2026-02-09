import inquirer from "inquirer";
import chalk from "chalk";

import type { MainMenuAction } from "../types/index.js";

import { projectFlow } from "./flows/projectFlow.js";
import { postFlow } from "./flows/postFlow.js";
import { showSettings } from "./settings.js";

export async function showMainMenu(): Promise<void> {
  console.log(chalk.cyan.bold("Notion CLI"));
  console.log(chalk.gray("Automate your Notion tasks with ease!"));

  const { action } = await inquirer.prompt<{ action: MainMenuAction }>([
    {
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: [
        { name: "New Project", value: "new" },
        { name: "New Social Media Post", value: "social_media" },
        { name: "Settings", value: "settings" },
        { name: "Exit", value: "exit" },
      ],
    },
  ]);

  switch (action) {
    case "new":
      return projectFlow();

    case "social_media":
      return postFlow();

    case "settings":
      return showSettings();

    case "exit":
      console.log(chalk.green("Until later!"));
      return;
  }
}
