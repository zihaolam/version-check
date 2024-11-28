#!/usr/bin/env node

// update version in /public/build-version.json
const { writeFileSync, existsSync } = require("node:fs");
const { resolve } = require("path");

// CLI usage help
function showUsage() {
  console.log(`Usage: update-version <path-to-build-version.json>`);
  console.log(`Example: update-version public/build-version.json`);
}

// Main function
function updateVersion(dir) {
  // Check if the file path exists
  const absolutePath = resolve(dir, "build-version.json");

  if (!existsSync(dir)) {
    console.error(`Error: Directory does not exist: ${dir}`);
    process.exit(1);
  }

  // Generate a unique version string (e.g., hash or timestamp)
  const version = Date.now().toString();

  const versionData = {
    version,
  };

  // Write the version file
  try {
    writeFileSync(absolutePath, JSON.stringify(versionData), "utf-8");
    console.log(`✅ Version file updated at: ${absolutePath}`);
    console.log(`Version: ${version}`);
  } catch (error) {
    console.error(`Error: Failed to write version file: ${error.message}`);
    process.exit(1);
  }
}

// Parse CLI arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error(`Error: Invalid number of arguments.`);
  showUsage();
  process.exit(1);
}

// Run the tool
updateVersion(args[0]);
