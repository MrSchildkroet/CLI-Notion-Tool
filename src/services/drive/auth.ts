import { authorize } from "./drive.js";
import { createFolder } from "./drive.js";
import { config } from "../../config.js";

import type { DriveFolderInfo } from "../../types/index.js";

const parentFolderId = config.projectsRootId;

authorize(async (auth) => {
  const folderId = await createFolder(auth, folderName, parentFolderId);
});
