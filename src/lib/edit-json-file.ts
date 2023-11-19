import readJsonFile from './read-json-file';
import writeJsonFile from './write-json-file';

export default async function editJsonFile<T>(
  path: string,
  cb: (data: T) => T,
): Promise<void> {
  await writeJsonFile<T>(path, cb(await readJsonFile<T>(path)));
}
