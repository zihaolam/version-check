"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  VersionChecker: () => VersionChecker
});
module.exports = __toCommonJS(src_exports);

// src/VersionChecker.tsx
var import_react = require("react");
var useVersionCheck = () => {
  const lastCheck = (0, import_react.useRef)();
  const checkVersion = (0, import_react.useCallback)(async () => {
    try {
      const currentVersion = window.localStorage.getItem("version");
      const data = await (await fetch("/build-version.json")).json();
      if (!currentVersion) {
        window.localStorage.setItem("version", data.version);
        return;
      }
      if (data.version !== currentVersion) {
        window.localStorage.setItem("version", data.version);
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") {
      console.warn(
        "useVersionCheck hook is not supported because window is undefined"
      );
      return;
    }
    checkVersion();
    const listener = () => {
      if (document.hidden) return;
      if (lastCheck.current && Date.now() - lastCheck.current < 5 * 60 * 1e3)
        return;
      lastCheck.current = Date.now();
      checkVersion();
    };
    window.addEventListener("visibilitychange", listener);
    return () => {
      window.removeEventListener("visibilitychange", listener);
    };
  }, [checkVersion]);
};
var VersionChecker = () => {
  useVersionCheck();
  return null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VersionChecker
});
