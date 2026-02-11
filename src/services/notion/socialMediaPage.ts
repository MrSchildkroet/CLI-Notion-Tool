import { Client } from "@notionhq/client";
import chalk from "chalk";

import { config } from "../../config.js";
import { logger } from "../../utils/logger.js";
import type { NotionPostProperties } from "../../types/index.js";
import { NotionError } from "../../types/errors.js";

export async function createSocialMediaEntry(properties: NotionPostProperties): Promise<void> {
  const notion = new Client({ auth: config.notionKeySocialMedia });

  const { title, description, platform, date } = properties;

  try {
    logger.info(`Creating new Social Media Notion entry: ${title}`);

    await notion.pages.create({
      parent: { database_id: config.databaseIdSocialMedia },
      properties: {
        Name: {
          title: [{ text: { content: title } }],
        },
        Description: {
          rich_text: [{ text: { content: description } }],
        },
        Platform: {
          rich_text: [{ text: { content: platform } }],
        },
        "Post Date": {
          date: { start: date },
        },
      },
    });

    console.log(chalk.green("Social Media Notion entry created successfully."));
    logger.info(`Social Media Notion entry successfully created: ${title}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new NotionError(err.message, err);
    }

    throw new NotionError("Unknown Notion error", err);
  }
}
