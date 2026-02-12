import { Client } from "@notionhq/client";
import chalk from "chalk";

import { config } from "../../config.js";
import { logger } from "../../utils/logger.js";
import type { NotionProjectProperties } from "../../types/index.js";
import { NotionError } from "../../types/errors.js";

export async function createNotionEntry(properties: NotionProjectProperties): Promise<void> {
  const notion = new Client({ auth: config.notionKeyProjects });

  const { title, priority, repoURL, startDate, endDate } = properties;

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
      throw new NotionError(err.message, err);
    }

    throw new NotionError("Unknown Notion error", err);
  }
}
