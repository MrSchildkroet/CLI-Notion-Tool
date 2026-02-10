import { Client } from "@notionhq/client";
import chalk from "chalk";

import { getConfig } from "../../config.js";
import { logger } from "../../utils/logger.js";
import type { NotionProjectProperties } from "../../types/index.js";

function getNotionProjectClient() {
  const config = getConfig();
  return new Client({ auth: config.notionKeyProjects });
}

export async function createNotionEntry(
  properties: NotionProjectProperties,
): Promise<void> {
  const notion = getNotionProjectClient();
  const config = getConfig();

  const { title, priority, repoURL, status, startDate, endDate } = properties;

  try {
    logger.info(`Creating new Notion Project-entry: ${title}`);
    await notion.pages.create({
      parent: { database_id: config.databaseIdProjects },
      properties: {
        "Project name": {
          title: [{ text: { content: title } }],
        },
        Priority: {
          select: { name: priority },
        },
        "Start date": {
          date: { start: startDate },
        },
        "End date": {
          date: { start: endDate },
        },
        URL: {
          url: repoURL,
        },
      },
    });

    console.log(chalk.green("Notion entry created successfully."));
    logger.info(`Notion entry successfully created: ${title}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(
        `Error occurred trying to create Notion entry: ${err.message}`,
      );
      console.log(chalk.red("Error occurred trying to create Notion entry"));
    }

    throw err;
  }
}
