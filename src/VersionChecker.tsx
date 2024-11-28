import { useEffect, useCallback, useRef } from "react";

const useVersionCheck = () => {
  const lastCheck = useRef<number>();
  const checkVersion = useCallback(async () => {
    try {
      const currentVersion = window.localStorage.getItem("version");
      const data = await (await fetch("/build-version.json")).json();

      if (!currentVersion) {
        window.localStorage.setItem("version", data.version);
        // if there is no current version means that this is the first load
        return;
      }

      // else if there is a current version, we compare it with the version fetched, then reload if not equal
      // eslint-disable-next-line eqeqeq
      if (data.version !== currentVersion) {
        window.localStorage.setItem("version", data.version);
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      console.warn(
        "useVersionCheck hook is not supported because window is undefined",
      );
      return;
    }
    checkVersion();
    const listener = () => {
      if (document.hidden) return;
      // throttle by 5 minutes
      if (lastCheck.current && Date.now() - lastCheck.current < 5 * 60 * 1000)
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

export const VersionChecker = () => {
  useVersionCheck();

  return null;
};

export default VersionChecker;
