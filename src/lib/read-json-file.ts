import { readFile } from 'node:fs/promises';

export default async function readJsonFile<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf-8')) as T;
}
