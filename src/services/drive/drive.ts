import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { google, drive_v3 } from "googleapis";

import { logger } from "../../utils/logger.js";
import { config } from "../../config.js";

// Authentification
export function authorize(callback: (auth: any) => void): void {
  try {
    const credsPath = config.googleCredsPath;

    if (!fs.existsSync(credsPath)) {
      logger.fatal(`Google Credentials not found at: ${credsPath}`);
      throw new Error("Google Credentials file missing.");
    }

    const credentials = fs.readJSONSync(credsPath, "utf8");

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    logger.info("Google Drive authorization successful.");
    callback(auth);
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Google Auth failed: ${err.message}`);
    }

    throw err;
  }
}

// Creating folder
export async function createFolder(
  auth: any,
  folderName: string,
  parentFolderId: string,
): Promise<string> {
  try {
    const drive = google.drive({ version: "v3", auth });

    logger.info(`Creating Google Drive folder: ${folderName}`);

    const response = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      },
      fields: "id",
    });

    const folderId = response.data.id;

    if (!folderId) {
      throw new Error("Drive folder creation returned no ID.");
    }

    logger.info(`Drive folder created: ${folderId}`);
    console.log(chalk.green("Drive folder created successfully."));

    return folderId;
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(
        `Error occurred trying to create Drive folder: ${err.message}`,
      );
      console.log(chalk.red("Error occurred trying to create Drive folder."));
    }

    throw err;
  }
}
