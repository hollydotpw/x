import { join } from 'node:path';

import fileExists from 'lib/file-exists';
import readJsonFile from 'lib/read-json-file';

export default async function doProjectSettingsFileExist(path: string): Promise<boolean> {
  const packageJsonExists = await fileExists(join(path, 'package.json'));

  if (!packageJsonExists) {
    return false;
  }

  const packageJson = await readJsonFile<PackageJson>(join(path, 'package.json'));

  return packageJsonExists && 'x' in packageJson;
}
