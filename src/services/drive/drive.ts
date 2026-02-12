import fs from "fs-extra";
import chalk from "chalk";
import { google } from "googleapis";
import type { OAuth2Client } from "google-auth-library";

import { logger } from "../../utils/logger.js";

// Authentification
export async function authorize(callback: (auth: OAuth2Client) => void): Promise<void> {
  try {
    const credsPath = "./credentials.json";

    if (!fs.existsSync(credsPath)) {
      logger.fatal(`Google Credentials not found at: ${credsPath}`);
      throw new Error("Google Credentials file missing.");
    }

    const credentials = fs.readJSONSync(credsPath, "utf8");

    const { client_id, client_secret, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    const tokenPath = "./token.json";

    if (fs.existsSync(tokenPath)) {
      const token = fs.readJSONSync(tokenPath, "utf8");
      oAuth2Client.setCredentials(token);
      logger.info("Google Drive authorization successful.");
      callback(oAuth2Client);
      return;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Google Auth failed: ${err.message}`);
    }

    throw err;
  }
}

// Creating folder
export async function createFolder(
  auth: OAuth2Client,
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
      logger.error(`Error occurred trying to create Drive folder: ${err.message}`);
      console.log(chalk.red("Error occurred trying to create Drive folder."));
    }

    throw err;
  }
}
