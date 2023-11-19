import { join } from 'node:path';

import readJsonFile from 'lib/read-json-file';

export default async function getProjects(
  path: string,
): Promise<BundlerOptions[]> {
  const packageJson = await readJsonFile<PackageJson>(join(path, 'package.json'));

  return packageJson.x;
}
