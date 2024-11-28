# Version check for React SPA

## Setup

Run `npm install @zihaolam/version-check`

Add `update-build-version <dir-to-store-version>` to your package.json postbuild script

Add to your app entrypoint

```
import { VersionChecker } from '@zihaolam/version-check';

const App = () => {
    return (
        <>
            <VersionChecker />
            {* rest of your app *}
        </>
    );
}
```

## How it works

On page load, or on visibilitychange, it will send a fetch request to the apps /build-version.json file to check for the version updates. It reloads entire browser if versions do not match.

Since it relies on fetching the /build-version.json file, it is important to specify the correct directory in the postbuild script. Example, for Vite React App, it is `update-build-version dist` because by default build files are transpiled into dist/ folder.
In Nextjs, it is `update-build-version .next/out` because by default build files are transpiled into .next/out folder.
