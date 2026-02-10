import { execFile } from "child_process";
import { promisify } from "util";
import chalk from "chalk";

import { logger } from "../../utils/logger.js";
import type { PythonExportProperties } from "../../types/index.js";

const execFileAsync = promisify(execFile);

export async function runPythonExport(
  properties: PythonExportProperties,
): Promise<void> {
  const { title, platform, date } = properties;

  logger.info(`Starting Python export: ${title}`);

  try {
    const pythonScript = "scripts/python/export_to_excel.py";

    await execFileAsync("python", [pythonScript, title, platform, date]);
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Python export failed: ${err.message}`);
      console.log(chalk.red("Python export to Excel failed."));
    }

    throw err;
  }
}
