# Version check for React SPA

## Setup

Add `bun/npm/pnpm/yarn update-build-version <public-dir>` to your package.json postbuild script

Add to your app entrypoint

```
import { VersionChecker } from '@zihaolam/version-check';
<VersionChecker />
```
