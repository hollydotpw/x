import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

import log from 'lib/log';
import staticFiles from 'constant/static-files';

const NON_BLOAT_FILES = ['.gitignore', '.not_gitignore'];

async function removeBloatFiles(path: string): Promise<void> {
  const fileToRemove: string[] = [
    ...staticFiles.keys(),
    'dist',
    'node_modules',
  ].filter((name) => !NON_BLOAT_FILES.includes(name));

  await Promise.all(
    fileToRemove.map(async (file: string) => {
      try {
        await rm(resolve(path, file), { recursive: true });
      } catch (error) {
        log(`error with file ${file}`);
      }
    }),
  );
}

export default async function debloat(path: string): Promise<void> {
  await removeBloatFiles(path);
}
