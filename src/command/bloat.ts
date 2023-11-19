import { join, resolve } from 'node:path';
import {
  rename, writeFile,
} from 'node:fs/promises';

import writeJsonFile from 'lib/write-json-file';
import readJsonFile from 'lib/read-json-file';

import staticFiles from 'constant/static-files';
import linterDependencies from 'constant/linter-dependencies';

async function copyBloatFiles(path: string): Promise<void> {
  await Promise.all(
    Array.from(staticFiles.entries())
      .map(
        ([filename, content]) => writeFile(join(path, filename), content),
      ),
  );

  await rename(
    resolve(path, '.not_gitignore'),
    resolve(path, '.gitignore'),
  );
}

async function addLinterDependencies({ path }: MainContext) {
  const packageJson = await readJsonFile<PackageJson>(resolve(path, 'package.json'));

  /* const { PURR_PATH } = process.env;
  if ('purr' in packageJson.dependencies && PURR_PATH) {
    packageJson.dependencies.purr = PURR_PATH;
  } */

  await writeJsonFile(resolve(path, 'package.json'), {
    ...packageJson,
    devDependencies: {
      ...packageJson.devDependencies,
      ...linterDependencies,
    },
  });
}

export default async function bloat(context: MainContext) {
  await addLinterDependencies(context);
  await copyBloatFiles(context.path);
}
