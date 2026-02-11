import path from "path";
import os from "os";

import fs from "fs-extra";
import chalk from "chalk";

import type { MinecraftFolderOptions } from "../../types/index.js";
import { logger } from "../../utils/logger.js";
import { AppError } from "../../types/errors.js";

export function createMinecraftFolder({ projectName }: MinecraftFolderOptions): void {
  const basePath = path.join(
    os.homedir(),
    "AppData",
    "Roaming",
    "Minecraft Bedrock",
    "Users",
    "Shared",
    "games",
    "com.mojang",
  );

  const bpPath = path.join(basePath, "development_behavior_packs");
  const rpPath = path.join(basePath, "development_resource_packs");
  const projectBP = path.join(bpPath, projectName);
  const projectRP = path.join(rpPath, projectName);

  try {
    fs.mkdirSync(projectBP, { recursive: true });
    fs.mkdirSync(projectRP, { recursive: true });

    logger.info(`Minecraft BP Ordner erstellt: ${projectBP}`);
    logger.info(`Minecraft RP Ordner erstellt: ${projectRP}`);

    console.log(chalk.green(`Minecraft folders for "${projectName}" created successfully. `));
  } catch (err: unknown) {
    if (err instanceof AppError) {
      logger.error(`[${err.code}] ${err.message}`);
      return;
    }

    logger.error(`Unknown error: ${err}`);
  }
}
