import { writeFile } from 'node:fs/promises';

export default async function writeJsonFile<T>(path: string, object: T): Promise<void> {
  await writeFile(path, JSON.stringify(object, null, 2));
}
