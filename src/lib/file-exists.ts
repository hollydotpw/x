import { access, constants } from 'node:fs/promises';

export default async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);

    return true;
  } catch {
    return false;
  }
}
