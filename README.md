# CLI Notion Tool

**Ein leistungsstarkes Kommandozeilen-Werkzeug zur Automatisierung und Integration von Notion mit GitHub, Google Drive und Git.**

---

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Features](#-features)
- [Installation](#-installation)
- [Konfiguration](#-konfiguration)
- [Nutzung](#-nutzung)
- [Projektstruktur](#-projektstruktur)
- [Häufige Fehler & Lösungen](#-häufige-fehler--lösungen)
- [Debugging](#-debugging)
- [Lizenz](#-lizenz)
- [Changelog](#-changelog)

---

## Überblick

Das **CLI Notion Tool** ist eine spezialisierte Anwendung, die folgende Integrationen ermöglicht:

- **Notion-Integration**: Erstelle und verwalte Notion-Datenbankeinträge automatisch
- **GitHub-Integration**: Verbinde Notion-Projekte mit GitHub-Repositories
- **Google Drive-Integration**: Strukturiere automatisch Google Drive-Ordner für neue Projekte
- **Git-Automatisierung**: Richte Git-Repositories mit standardisierten Konfigurationen ein
- **Minecraft-Support**: Erstelle automatisch Minecraft Bedrock Project-Strukturen

Das Tool stellt eine interaktive CLI-Menüführung bereit, mit der Benutzer neue Projekte, Social-Media-Posts und andere Inhalte verwalten können.

**Version**: 1.0.0  
**Lizenz**: [Attribution-NonCommercial 4.0 International](./LICENSE.txt)  
**Autor**: MrSchildkroet

---

## Features

- ✅ **Notion Datenbankanbindung** – Projekte und Social-Media-Posts verwalten
- ✅ **GitHub Repository-Automation** – Automatische Erstellung und Konfiguration
- ✅ **Google Drive-Integration** – Projektordner-Strukturen erstellen
- ✅ **Interaktive CLI** – Benutzerfreundliche Menüführung mit Inquirer.js
- ✅ **Git-Unterstützung** – Automatische Repository-Initialisierung
- ✅ **Minecraft Bedrock-Projektstuktur** – Vordefinierte Folder-Strukturen
- ✅ **Logging-System** – Detaillierte Logs für Debugging
- ✅ **Konfigurierbar** – Vollständige Umgebungsvariablen-Unterstützung
- ℹ️ **Google Drive Service** – Derzeit deaktiviert (siehe Changelog)

---

## Installation

### Voraussetzungen

- **Node.js** 18+ (empfohlen: 20 LTS)
- **npm** oder **pnpm**
- Git (für Repository-Operationen)
- **.env-Datei** mit erforderlichen Umgebungsvariablen

### Schritt-für-Schritt

1. **Abhängigkeiten installieren**:

   **Shell (Bash/Zsh – Linux/macOS)**

   ```bash
   npm install
   ```

   **PowerShell (Windows)**

   ```powershell
   npm install
   ```

2. **Umgebungsvariablen einrichten** (siehe [Konfiguration](#-konfiguration)):

   **Shell (Bash/Zsh – Linux/macOS)**

   ```bash
   cp .env.example .env
   # Bearbeite die .env-Datei mit deinen API-Keys
   ```

   **PowerShell (Windows)**

   ```powershell
   Copy-Item -Path .env.example -Destination .env
   # Bearbeite die .env-Datei mit deinen API-Keys
   ```

3. **TypeScript kompilieren**:

   **Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

   ```bash
   npm run build
   ```

4. **Tool verfügbar machen** (Optional – als globales npm-Kommando):

   **Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

   ```bash
   npm install -g .
   ```

---

## Konfiguration

### Erforderliche Umgebungsvariablen

Die Datei `.env` muss folgende Variablen enthalten:

```env
# Notion API Keys (für Projekte und Social Media)
NOTION_KEY=<YOUR_NOTION_KEY>
NOTION_KEY_SOCIAL_MEDIA=<YOUR_NOTION_KEY_SOCIAL_MEDIA_DATABASE>

# Notion Datenbank-IDs
DATABASE_ID=<YOUR_DATABASE_ID>
DATABASE_ID_SOCIAL_MEDIA=<YOUR_DATABASE_ID_SOCIAL_MEDIA_DATABASE>

# GitHub Personal Access Token
GITHUB_TOKEN=<YOUR_GITHUB_TOKEN>

# Google Drive Anmeldeinformationen
GOOGLE_CREDS_PATH=/path/to/google/credentials.json

# Google Drive Projekt-Root-Ordner ID
DRIVE_ROOT_ID=<YOUR_DRIVE_FOLDER_ROOT_ID>
```

### Beschaffung der API-Keys

#### Notion API Key

1. Gehe zu [notion.com/my-integrations](https://www.notion.com/my-integrations)
2. Erstelle eine neue Integration
3. Kopiere den "Internal Integration Token"

#### Notion Datenbank-IDs

1. Öffne die Datenbank in Notion
2. Die ID ist in der Browser-URL nach dem `/` enthalten
3. Mit der ID des Datenbankeintrags beginnt die ID

#### GitHub Token

1. Gehe zu [github.com/settings/tokens](https://github.com/settings/tokens)
2. Generiere einen neuen Token (Classic oder Fine-grained)
3. Erforderliche Scopes: `repo`, `user`

#### Google Drive Credentials

1. Gehe zu [Google Cloud Console](https://console.cloud.google.com)
2. Erstelle ein neues Projekt
3. Aktiviere die Google Drive API
4. Erstelle einen Service Account und lade die JSON-Datei herunter
5. Setze `GOOGLE_CREDS_PATH` auf den Pfad zur JSON-Datei

---

## Nutzung

### Starten mit npm

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
npm start
```

### Als globales Kommando (nach Installation)

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
notion-cli
```

### Hauptmenü-Optionen

```
Notion CLI
Automate your Notion tasks with ease!

► New Project               – Erstelle ein neues Projekt mit Notion, GitHub und Drive
  New Social Media Post     – Erstelle einen neuen Social-Media-Post
  Settings                  – Konfiguriere Einstellungen
  Exit                      – Beende das Programm
```

### Workflows

#### 1. Neues Projekt erstellen

- Abfrage von Projektdetails
- Automatische GitHub-Repository-Erstellung
- Notion-Datenbankeinträge hinzufügen
- Minecraft Bedrock-Add-On Ordner (optional)
- Google Drive-Ordner erstellen (derzeit deaktiviert)

#### 2. Neuen Social-Media-Post erstellen

- Post-Details eingeben
- In Notion speichern
- Verschiedene Plattformen vorbereiten

#### 3. Einstellungen

- Tokens checken

---

## Projektstruktur

```
CLI-Notion-Tool/
├── src/
│   ├── bin/
│   │   └── cli.ts                 # Einstiegspunkt
│   ├── cli/
│   │   ├── index.ts               # Hauptmenü
│   │   ├── settings.ts            # Einstellungs-Interface
│   │   └── flows/
│   │       ├── projectFlow.ts      # Project-Workflow
│   │       ├── postFlow.ts         # Social Media Post-Workflow
│   │       └── minecraftFlow.ts    # Minecraft-Setup
│   ├── services/
│   │   ├── github.ts              # GitHub API-Integration
│   │   ├── gitops.ts              # Git-Operationen
│   │   ├── drive/                 # Google Drive-Integration
│   │   │   ├── auth.ts            # Google OAuth-Authentication
│   │   │   ├── drive.ts           # Drive API-Operationen
│   │   │   └── credentials.json
│   │   ├── notion/                # Notion API-Integration
│   │   │   ├── projectPage.ts     # Notion Project-Seiten
│   │   │   └── socialMediaPage.ts # Notion Social-Media-Seiten
│   │   └── python/
│   │       └── exporter.ts        # Python-Script-Integration
│   ├── types/
│   │   └── index.ts               # TypeScript-Typdefinitionen
│   ├── utils/
│   │   └── logger.ts              # Logging-System
│   ├── config.ts                  # Umgebungskonfiguration
│   └── constants.ts               # Globale Konstanten
├── logs/                          # Log-Dateien (generiert)
├── scripts/
│   └── python/
│       └── export_to_excel.py     # Excel-Export-Script
├── dist/                          # Kompilierter JavaScript (generiert)
├── .env                           # Umgebungsvariablen (lokal)
├── .gitignore                     # Git-Ignorieregeln
├── tsconfig.json                  # TypeScript-Konfiguration
├── package.json                   # npm-Abhängigkeiten
├── LICENSE.txt                    # Lizenzinfo
├── CHANGELOG.md                   # Versionshistorie
└── README.md                      # Diese Datei
```

---

## Häufige Fehler & Lösungen

### 1. **"Environment variable X is missing"**

**Problem**: Eine erforderliche Umgebungsvariable wurde nicht gesetzt.

**Lösung**:

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Überprüfe die .env-Datei
cat .env

# Stelle sicher, dass alle erforderlichen Variablen gesetzt sind
# Siehe Abschnitt "Konfiguration" für die vollständige Liste
```

**PowerShell (Windows)**

```powershell
# Überprüfe die .env-Datei
Get-Content .env

# Stelle sicher, dass alle erforderlichen Variablen gesetzt sind
# Siehe Abschnitt "Konfiguration" für die vollständige Liste
```

---

### 2. **"Invalid Notion API Key"**

**Problem**: Der NOTION_KEY ist ungültig oder abgelaufen.

**Lösung**:

- Verwende einen gültigen Internal Integration Token von [notion.com/my-integrations](https://www.notion.com/my-integrations)
- Stelle sicher, dass die Integration auf die relevanten Datenbanken zugreifen kann
- Überprüfe, dass die Datenbank in der Integration "shared" ist

---

### 3. **"GitHub Token not valid" oder "API rate limit exceeded"**

**Problem**: GitHub API-Fehler bei der Repository-Erstellung.

**Lösung**:

**Allgemein (alle Systeme)**

```
# Token überprüfen
# - Token muss `repo` und `user` Scopes haben
# - Token darf nicht abgelaufen sein
# - Für Orgs: `admin:org_hook` Scope erforderlich

# Rate-Limiting vermeiden:
# - GitHub begrenzt auf 5000 Requests/Stunde
# - Warte eine Stunde oder verwende seltenere Operationen
```

---

### 4. **"DATABASE_ID not found in Notion"**

**Problem**: Die Notion-Datenbank-ID ist ungültig.

**Lösung**:

**Allgemein (alle Systeme)**

```
# FORMAT DER ID ÜBERPRÜFEN:
# - Richtig:   abd123456789abcdef0123456789abcd
# - Falsch:    abd123456789-abcdef-0123456789abcd (mit Bindestrichen)

# Authentifizierung überprüfen:
# - Integration muss Zugriff auf die Datenbank haben
# - Teilbar die Datenbank mit der Integration in Notion
```

---

### 5. **"Build fehlgeschlagen: TypeScript-Fehler"**

**Problem**: Kompilierungsfehler beim `npm run build`.

**Lösung**:

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Fehlerdetails anschauen
npm run build

# TypeScript-Checker
npx tsc --noEmit

# Abhängigkeiten neu installieren
rm -rf node_modules package-lock.json
npm install
npm run build
```

**PowerShell (Windows)**

```powershell
# Fehlerdetails anschauen
npm run build

# TypeScript-Checker
npx tsc --noEmit

# Abhängigkeiten neu installieren
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run build
```

---

### 6. **"Google Drive Service is disabled"**

**Problem**: Google Drive-Integration funktioniert nicht.

**Aktueller Status**: ℹ️ Die Google Drive-Integration ist in v1.0.0 deaktiviert. Sie wird in einer zukünftigen Version aktiviert.

---

### 7. **"ENOENT: no such file or directory, open '.env'"**

**Problem**: .env-Datei fehlt.

**Lösung**:

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Erstelle die .env-Datei
touch .env

# Oder kopiere von einem Template
cp .env.example .env

# Bearbeite die Datei mit deinen API-Keys
# (Nutze einen Editor wie VSCode, etc.)
```

**PowerShell (Windows)**

```powershell
# Erstelle die .env-Datei (ist leer wenn nicht vorhanden)
New-Item -Name ".env" -ItemType "file" -Force

# Oder kopiere von einem Template
Copy-Item -Path .env.example -Destination .env -Force

# Bearbeite die Datei mit deinen API-Keys
# (Nutze einen Editor wie VSCode, notepad++, etc.)
```

---

### 8. **"Python script not found"**

**Problem**: Das Python-Export-Script wird nicht gefunden.

**Lösung**:

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Überprüfe, ob Python installiert ist
python --version

# Überprüfe den Pfad zum Script
ls scripts/python/export_to_excel.py

# Stelle sicher, dass die erforderlichen Python-Packages installiert sind
pip install pandas openpyxl
```

**PowerShell (Windows)**

```powershell
# Überprüfe, ob Python installiert ist
python --version

# Überprüfe den Pfad zum Script
Test-Path scripts\python\export_to_excel.py

# Stelle sicher, dass die erforderlichen Python-Packages installiert sind
pip install pandas openpyxl
```

---

### 9. **"Cannot find module '@notionhq/client'"**

**Problem**: Notion-Abhängigkeit ist nicht installiert.

**Lösung**:

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
# Installiere alle Abhängigkeiten erneut
npm install

# Oder gezielt die Notion-Abhängigkeit
npm install @notionhq/client
```

---

### 10. **"Git command not found"**

**Problem**: Git ist nicht installiert oder nicht im PATH.

**Lösung**:

- [Git installieren](https://git-scm.com/downloads)
- System neu starten (damit PATH aktualisiert wird)
- Überprüfe: `git --version`

---

## Debugging

### 1. **Logs ansehen**

Das Tool erstellt Logs im `logs/`-Verzeichnis:

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Neueste Logs anschauen
ls -lrt logs/

# Log-Datei öffnen und live verfolgen
tail -f logs/Notion-CLI-*.log
```

**PowerShell (Windows)**

```powershell
# Neueste Logs anschauen
Get-ChildItem -Path logs/ | Sort-Object LastWriteTime | Select-Object -Last 5

# Log-Datei öffnen und live verfolgen
Get-Content -Path logs/Notion-CLI-*.log -Wait
```

Log-Dateien sind benannt als: `Notion-CLI-YYYY-MM-DD.log`

Diese sind auf 5 MB begrenzt und werden automatisch rotiert.

---

### 2. **Umgebungsvariablen überprüfen**

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Alle gesetzten Variablen anzeigen
env | grep NOTION
env | grep GITHUB
env | grep DATABASE
env | grep GOOGLE
env | grep DRIVE
```

**PowerShell (Windows)**

```powershell
# Umgebungsvariablen anzeigen (einzeln)
Get-ChildItem -Path Env:NOTION_KEY
Get-ChildItem -Path Env:GITHUB_TOKEN
Get-ChildItem -Path Env:DATABASE_ID

# Oder alle mit Filter anzeigen
Get-ChildItem -Path Env: | Where-Object {$_.Name -like "NOTION*" -or $_.Name -like "GITHUB*" -or $_.Name -like "DATABASE*" -or $_.Name -like "GOOGLE*" -or $_.Name -like "DRIVE*"}
```

---

### 3. **API-Verbindungen testen**

Nutze das Settings-Menü zum Testen der Integrationen:

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
npm start
# → Settings → Connection Tests
```

---

### 4. **TypeScript-Fehler beheben**

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Überprüfe auf Fehler ohne zu kompilieren
npx tsc --noEmit

# Repariere automatisch
npx tsc --noEmit --pretty

# Baue neu mit Clean-Build
rm -rf dist
npm run build
```

**PowerShell (Windows)**

```powershell
# Überprüfe auf Fehler ohne zu kompilieren
npx tsc --noEmit

# Repariere automatisch
npx tsc --noEmit --pretty

# Baue neu mit Clean-Build
Remove-Item -Recurse -Force dist
npm run build
```

---

### 5. **Detaillierte Fehlersuche**

Führe das Programm mit Node-Debug aus:

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
node --inspect dist/bin/cli.js
```

Dann öffne `chrome://inspect` in Chrome DevTools.

---

### 6. **Package.json-Scripts verstehen**

**Shell (Bash/Zsh – Linux/macOS) & PowerShell (Windows)**

```bash
# Kompiliere TypeScript zu JavaScript
npm run build

# Starte das kompilierte Programm
npm start

# Tests ausführen (derzeit nicht implementiert)
npm test

# Alternative: Direktes Launch mit ts-node
npx ts-node src/bin/cli.ts
```

---

### 7. **Wenn alles andere fehlschlägt**

**Shell (Bash/Zsh – Linux/macOS)**

```bash
# Vollständiger Clean-Setup
rm -rf node_modules dist package-lock.json
npm install
npm run build

# Überprüfe die .env-Datei (alle erforderlichen Variablen?)
cat .env

# Starte das Tool
npm start
```

**PowerShell (Windows)**

```powershell
# Vollständiger Clean-Setup
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force dist
Remove-Item -Force package-lock.json
npm install
npm run build

# Überprüfe die .env-Datei (alle erforderlichen Variablen?)
Get-Content .env

# Starte das Tool
npm start
```

---

## Lizenz

Dieses Projekt wird unter der **Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** Lizenz veröffentlicht.

**Zusammenfassung**:

- ✅ **Kostenlos nutzbar** für private und nicht-kommerzielle Zwecke
- ✅ **Änderungen erlaubt** – Adaptierungen sind möglich
- ✅ **Quellangabe erforderlich** – Der Urheber muss genannt werden
- ❌ **Kommerzielle Nutzung verboten** – Nicht für gewerbliche Zwecke
- ❌ **Keine Sublizenzierung** – Darf nicht unter anderen Lizenzen weitergegeben werden

Vollständige Lizenz-Details: [LICENSE.txt](./LICENSE.txt)

---

## Changelog

Das komplette Changelog mit allen Versionen, Features und Bugfixes ist in [CHANGELOG.md](./CHANGELOG.md) dokumentiert.

### Aktuelle Version (1.0.0)

**Release**: 10. Februar 2026

**Added**:

- GitHub-Repository-Automatisierung
- Notion-Seiten-Integration
- Minecraft Bedrock-Projekt-Struktur
- Interaktives CLI-Menü
- Logging-System

**In Progress / Geplant**:

- Google Drive-Integration (aktuell deaktiviert)
- Excel-Export-Funktionen
- Ausführliche Tests

Siehe [CHANGELOG.md](./CHANGELOG.md) für weitere Informationen.

---

## Support & Beiträge

**Fehler gefunden?**  
Hinweise und Improvements sind willkommen. Schau in [CONTRIBUTING.md](./CONTRIBUTING.md) für Richtlinien.

**Sicherheitsbedenken?**  
Sieh [SECURITY.md](./SECURITY.md) für Richtlinien zur verantwortungsvollen Offenlegung.

---

**Happy automating! 🚀**

