import fs from "fs";
import path from "path";

import { LOG_DIR, LOG_FILE_PREFIX, LOG_MAX_SIZE_MB } from "../constants.js";

class Logger {
  private logDirectory: string;

  constructor() {
    this.logDirectory = path.join(process.cwd(), LOG_DIR);

    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }
  }

  private getLogFilePath(): string {
    const now = new Date();
    const year = now.getFullYear();

    const oneJan = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil(
      ((now.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7,
    );

    return path.join(
      this.logDirectory,
      `${LOG_FILE_PREFIX}-${year}-W${String(week).padStart(2, "0")}.log`,
    );
  }

  private rotateLogFile(filePath: string): void {
    if (!fs.existsSync(filePath)) return;

    const stats = fs.statSync(filePath);
    const sizeMB = stats.size / (1024 * 1024);

    if (sizeMB > LOG_MAX_SIZE_MB) {
      const rotated = filePath.replace(".log", `-${Date.now()}.log`);
      fs.renameSync(filePath, rotated);
    }
  }

  private write(level: string, message: string): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };

    const line = JSON.stringify(logEntry);

    const filePath = this.getLogFilePath();
    this.rotateLogFile(filePath);

    fs.appendFileSync(filePath, line + "\n");
  }

  info(msg: string): void {
    this.write("INFO", msg);
  }

  warn(msg: string): void {
    this.write("WARN", msg);
  }

  error(msg: string): void {
    this.write("ERROR", msg);
  }

  fatal(msg: string): void {
    this.write("FATAL", msg);
    process.exit(1);
  }
}

export const logger = new Logger();
