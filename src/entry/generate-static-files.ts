import {
  readdir,
  readFile,
  writeFile,
} from 'node:fs/promises';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptPath = dirname(fileURLToPath(import.meta.url));
const folderPath = join(scriptPath, '..', '..', 'static', 'bloat');

const bloatFiles = await readdir(folderPath);

const fileMap = await Promise.all(
  bloatFiles.map(
    async (filename) => (
      [
        filename,
        await readFile(join(folderPath, filename), 'utf-8'),
      ] as [string, string]
    ),
  ),
);

await writeFile('src/constant/static-files/static-files.json', JSON.stringify(fileMap));
