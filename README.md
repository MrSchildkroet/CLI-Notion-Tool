# CLI Notion Tool

**A powerful command-line tool for automating and integrating Notion with GitHub, Google Drive, and Git.**

---

## Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Common Errors & Solutions](#-common-errors--solutions)
- [Debugging](#-debugging)
- [License](#-license)
- [Changelog](#-changelog)

---

## Overview

The **CLI Notion Tool** is a specialized application that enables the following integrations:

- **Notion Integration**: Create and manage Notion database entries automatically
- **GitHub Integration**: Connect Notion projects with GitHub repositories
- **Google Drive Integration**: Automatically create Google Drive folder structures for new projects
- **Git Automation**: Set up Git repositories with standardized configurations
- **Minecraft Support**: Automatically create Minecraft Bedrock BP & RP folders

The tool provides an interactive CLI menu interface that allows users to manage new projects, social media posts, and other content.

**Version**: 1.0.0  
**License**: [Attribution-NonCommercial 4.0 International](./LICENSE.txt)  
**Author**: MrSchildkroet

---

## Features

- ✅ **Notion Database Binding** – Manage projects and social media posts
- ✅ **GitHub Repository Automation** – Automatic creation and configuration
- ✅ **Google Drive Integration** – Create project folder structures
- ✅ **Interactive CLI** – User-friendly menu navigation with Inquirer.js
- ✅ **Git Support** – Automatic repository initialization
- ✅ **Minecraft Bedrock BP & RP Folders** – Predefined folder structures
- ✅ **Logging System** – Detailed logs for debugging
- ✅ **Configurable** – Full environment variable support
- ℹ️ **Google Drive Service** – Currently disabled (see Changelog)

---

## Installation

### Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **npm** or **pnpm**
- Git (for repository operations)
- **.env file** with required environment variables

### Step-by-Step

1. **Install dependencies**:

   **Shell (Bash/Zsh – Linux/macOS)**

   ```bash
   npm install
   ```

   **PowerShell (Windows)**

   ```powershell
   npm install
   ```

2. **Set up environment variables** (see [Configuration](#-configuration)):

   **Shell (Bash/Zsh – Linux/macOS)**

   ```bash
   cp .env.example .env
   # Edit the .env file with your API keys
   ```

   **PowerShell (Windows)**

   ```powershell
   Copy-Item -Path .env.example -Destination .env
   # Edit the .env file with your API keys
   ```

3. **Compile TypeScript**:

   **Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

   ```bash
   npm run build
   ```

4. **Make tool available as a command** (Optional – as a global npm command):

   **Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

   ```bash
   npm install -g .
   ```

---

## Configuration

### Required Environment Variables

The `.env` file must contain the following variables:

```env
# Notion API Keys (for projects and social media)
NOTION_KEY=<YOUR_NOTION_KEY>
NOTION_KEY_SOCIAL_MEDIA=<YOUR_NOTION_KEY_SOCIAL_MEDIA_DATABASE>

# Notion Database IDs
DATABASE_ID=<YOUR_DATABASE_ID>
DATABASE_ID_SOCIAL_MEDIA=<YOUR_DATABASE_ID_SOCIAL_MEDIA_DATABASE>

# GitHub Personal Access Token
GITHUB_TOKEN=<YOUR_GITHUB_TOKEN>

# Google Drive Credentials
GOOGLE_CREDS_PATH=/path/to/google/credentials.json

# Google Drive Project Root Folder ID
DRIVE_ROOT_ID=<YOUR_DRIVE_FOLDER_ROOT_ID>
```

### Obtaining API Keys

#### Notion API Key

1. Go to [notion.com/my-integrations](https://www.notion.com/my-integrations)
2. Create a new integration
3. Copy the "Internal Integration Token"

#### Notion Database IDs

1. Open the database in Notion
2. The ID is in the browser URL after the `/`
3. The database entry ID begins with the ID

#### GitHub Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Generate a new token (Classic or Fine-grained)
3. Required scopes: `repo`, `user`

#### Google Drive Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable the Google Drive API
4. Create a Service Account and download the JSON file
5. Set `GOOGLE_CREDS_PATH` to the path of the JSON file

---

## Usage

### Starting with npm

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
npm start
```

### As a global command (after installation)

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
notion-cli
```

### Main Menu Options

```
Notion CLI
Automate your Notion tasks with ease!

► New Project               – Create a new project with Notion, GitHub and Drive
  New Social Media Post     – Add a new social media post to the Notion database
  Settings                  – Check if API tokens are missing
  Exit                      – Exit the program
```

### Workflows

#### 1. Create New Project

- Query project details
- Automatic GitHub repository creation
- Add Notion database entries
- Minecraft Bedrock add-on folders (optional)
- Create Google Drive folder (currently disabled)

#### 2. Create New Social Media Post

- Enter post details
- Save to Notion
- Python script creates a new Excel file in the project root: `Posts.xlsx`

#### 3. Settings

- Check tokens

---

## Project Structure

```
CLI-Notion-Tool/
├── src/
│   ├── bin/
│   │   └── cli.ts                 # Entry point
│   ├── cli/
│   │   ├── index.ts               # Main menu
│   │   ├── settings.ts            # Settings interface
│   │   └── flows/
│   │       ├── projectFlow.ts      # Project workflow
│   │       ├── postFlow.ts         # Social media post workflow
│   │       └── minecraftFlow.ts    # Minecraft setup
│   ├── services/
│   │   ├── github.ts              # GitHub API integration
│   │   ├── gitops.ts              # Git operations
│   │   ├── drive/                 # Google Drive integration
│   │   │   ├── auth.ts            # Google OAuth authentication
│   │   │   ├── drive.ts           # Drive API operations
│   │   │   └── credentials.json
│   │   ├── notion/                # Notion API integration
│   │   │   ├── projectPage.ts     # Notion project pages
│   │   │   └── socialMediaPage.ts # Notion social media pages
│   │   └── python/
│   │       └── exporter.ts        # Python script integration
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── utils/
│   │   └── logger.ts              # Logging system
│   ├── config.ts                  # Environment configuration
│   └── constants.ts               # Global constants
├── logs/                          # Log files (generated)
├── scripts/
│   └── python/
│       └── export_to_excel.py     # Excel export script
├── dist/                          # Compiled JavaScript (generated)
├── .env                           # Environment variables (local)
├── .gitignore                     # Git ignore rules
├── tsconfig.json                  # TypeScript configuration
├── .prettierignore                # Prettier ignore rules
├── .prettierrc.json               # Prettier configuration
├── eslint.config.mjs              # ESLint configuration                  
├── package.json                   # npm dependencies
├── SECURITY.md                    # Security issue reporting rules
├── CODE_OF_CONDUCT.md             # Code of conduct
├── LICENSE.txt                    # License information
├── CHANGELOG.md                   # Version history
└── README.md                      # This file
```

---

## Common Errors & Solutions

### 1. **"Environment variable X is missing"**

**Problem**: A required environment variable was not set.

**Solution**:

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Check the .env file
cat .env

# Make sure all required variables are set
# See section "Configuration" for the complete list
```

**PowerShell (Windows)**

```powershell
# Check the .env file
Get-Content .env

# Make sure all required variables are set
# See section "Configuration" for the complete list
```

---

### 2. **"Invalid Notion API Key"**

**Problem**: The NOTION_KEY is invalid or expired.

**Solution**:

- Use a valid Internal Integration Token from [notion.com/my-integrations](https://www.notion.com/my-integrations)
- Make sure the integration can access the relevant databases

---

### 3. **"GitHub Token not valid" or "API rate limit exceeded"**

**Problem**: GitHub API error when creating a repository.

**Solution**:

**General (all systems)**

```
# Check token
# - Token must have `repo` and `user` scopes
# - Token must not be expired

# Avoid rate limiting:
# - GitHub limits to 5000 requests/hour
# - Wait an hour or use less frequent operations
```

---

### 4. **"DATABASE_ID not found in Notion"**

**Problem**: The Notion database ID is invalid.

**Solution**:

**General (all systems)**

```
# CHECK ID FORMAT:
# - Correct:   abd123456789abcdef0123456789abcd
# - Incorrect: abd123456789-abcdef-0123456789abcd (with hyphens)

# Check authentication:
# - Integration must have access to the database
```

---

### 5. **"Build failed: TypeScript error"**

**Problem**: Compilation error during `npm run build`.

**Solution**:

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Check error details
npm run build

# TypeScript checker
npx tsc --noEmit

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

**PowerShell (Windows)**

```powershell
# Check error details
npm run build

# TypeScript checker
npx tsc --noEmit

# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run build
```

---

### 6. **"Google Drive Service is disabled"**

**Problem**: Google Drive integration is not working.

**Current Status**: ℹ️ Google Drive integration is disabled in v1.0.0. It will be enabled in a future version.

---

### 7. **"ENOENT: no such file or directory, open '.env'"**

**Problem**: .env file is missing.

**Solution**:

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Create the .env file
touch .env

# Or copy from a template
cp .env.example .env

# Edit the file with your API keys
# (Use an editor like VSCode, etc.)
```

**PowerShell (Windows)**

```powershell
# Create the .env file (empty if not present)
New-Item -Name ".env" -ItemType "file" -Force

# Or copy from a template
Copy-Item -Path .env.example -Destination .env -Force

# Edit the file with your API keys
# (Use an editor like VSCode, notepad++, etc.)
```

---

### 8. **"Python script not found"**

**Problem**: The Python export script is not found.

**Solution**:

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Check if Python is installed
python --version

# Check the path to the script
ls scripts/python/export_to_excel.py

# Make sure the required Python packages are installed
pip install pandas openpyxl
```

**PowerShell (Windows)**

```powershell
# Check if Python is installed
python --version

# Check the path to the script
Test-Path scripts\python\export_to_excel.py

# Make sure the required Python packages are installed
pip install pandas openpyxl
```

---

### 9. **"Cannot find module '@notionhq/client'"**

**Problem**: Notion dependency is not installed.

**Solution**:

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
# Reinstall all dependencies
npm install

# Or specifically the Notion dependency
npm install @notionhq/client
```

---

### 10. **"Git command not found"**

**Problem**: Git is not installed or not in PATH.

**Solution**:

- [Install Git](https://git-scm.com/downloads)
- Restart system (to update PATH)
- Verify: `git --version`

---

## Debugging

### 1. **View Logs**

The tool creates logs in the `logs/` directory:

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# View latest logs
ls -lrt logs/

# Open and monitor log file in real-time
tail -f logs/Notion-CLI-*.log
```

**PowerShell (Windows)**

```powershell
# View latest logs
Get-ChildItem -Path logs/ | Sort-Object LastWriteTime | Select-Object -Last 5

# Open and monitor log file in real-time
Get-Content -Path logs/Notion-CLI-*.log -Wait
```

Log files are named as: `Notion-CLI-YYYY-Www.log`

These are limited to 5 MB and are automatically rotated.

---

### 2. **Check Environment Variables**

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Display all set variables
env | grep NOTION
env | grep GITHUB
env | grep DATABASE
env | grep GOOGLE
env | grep DRIVE
```

**PowerShell (Windows)**

```powershell
# Display environment variables (individually)
Get-ChildItem -Path Env:NOTION_KEY
Get-ChildItem -Path Env:GITHUB_TOKEN
Get-ChildItem -Path Env:DATABASE_ID

# Or display all with filter
Get-ChildItem -Path Env: | Where-Object {$_.Name -like "NOTION*" -or $_.Name -like "GITHUB*" -or $_.Name -like "DATABASE*" -or $_.Name -like "GOOGLE*" -or $_.Name -like "DRIVE*"}
```

---

### 3. **Check API Tokens**

Use the Settings menu to test API tokens:

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
npm start
# → Settings 
```

---

### 4. **Fix TypeScript Errors**

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Check for errors without compiling
npx tsc --noEmit

# Repair automatically
npx tsc --noEmit --pretty

# Rebuild with clean build
rm -rf dist
npm run build
```

**PowerShell (Windows)**

```powershell
# Check for errors without compiling
npx tsc --noEmit

# Repair automatically
npx tsc --noEmit --pretty

# Rebuild with clean build
Remove-Item -Recurse -Force dist
npm run build
```

---

### 5. **Detailed Error Investigation**

Run the program with Node debug:

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
node --inspect dist/bin/cli.js
```

Then open `chrome://inspect` in Chrome DevTools.

---

### 6. **Understand package.json Scripts**

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
# Compile TypeScript to JavaScript
npm run build

# Start the compiled program
npm start

# Run tests (currently not implemented)
npm test

# Alternative: Direct launch with ts-node
npx ts-node src/bin/cli.ts
```

---

### 7. **If Everything Else Fails**

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Complete clean setup
rm -rf node_modules dist package-lock.json
npm install
npm run build

# Check the .env file (all required variables?)
cat .env

# Start the tool
npm start
```

**PowerShell (Windows)**

```powershell
# Complete clean setup
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force dist
Remove-Item -Force package-lock.json
npm install
npm run build

# Check the .env file (all required variables?)
Get-Content .env

# Start the tool
npm start
```

---

## License

This project is published under the **Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license.

**Summary**:

- ✅ **Free to use** for private and non-commercial purposes
- ✅ **Modifications allowed** – Adaptations are possible
- ✅ **Attribution required** – The creator must be credited
- ❌ **Commercial use prohibited** – Cannot be used for commercial purposes
- ❌ **No sublicensing** – Cannot be redistributed under other licenses

Full license details: [LICENSE.txt](./LICENSE.txt)

---

## Changelog

The complete changelog with all versions, features, and bugfixes is documented in [CHANGELOG.md](./CHANGELOG.md).

### Current Version (1.0.0)

**Release**: February 12, 2026

**Added**:

- GitHub repository automation
- Notion page integration
- Minecraft Bedrock BP & RP folders
- Interactive CLI menu
- Logging system

**In Progress / Planned**:

- Google Drive integration (currently disabled)
- Comprehensive tests

See [CHANGELOG.md](./CHANGELOG.md) for more information.

---

## Support & Contributions

**Found a bug?**  
Suggestions and improvements are welcome. Check [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

**Security concerns?**  
See [SECURITY.md](./SECURITY.md) for responsible disclosure guidelines.

---

**Happy automating! 🚀**
