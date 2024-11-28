#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/update-version.ts
var import_node_fs = require("node:fs");
var import_node_path = __toESM(require("node:path"), 1);
function showUsage() {
  console.log(`Usage: update-version <path-to-build-version.json>`);
  console.log(`Example: update-version public/build-version.json`);
}
function updateVersion(dir) {
  const absolutePath = import_node_path.default.resolve(dir, "build-version.json");
  if (!(0, import_node_fs.existsSync)(dir)) {
    console.error(`Error: Directory does not exist: ${dir}`);
    process.exit(1);
  }
  const version = Date.now().toString();
  const versionData = {
    version
  };
  try {
    (0, import_node_fs.writeFileSync)(absolutePath, JSON.stringify(versionData), "utf-8");
    console.log(`\u2705 Version file updated at: ${absolutePath}`);
    console.log(`Version: ${version}`);
  } catch (error) {
    console.error(`Error: Failed to write version file: ${error}`);
    process.exit(1);
  }
}
var args = process.argv.slice(2);
if (args.length !== 1) {
  console.error(`Error: Invalid number of arguments.`);
  showUsage();
  process.exit(1);
}
updateVersion(args[0]);
