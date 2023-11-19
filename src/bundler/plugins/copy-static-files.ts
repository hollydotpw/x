import { Plugin } from 'esbuild';
import { cpSync } from 'node:fs';
import { dirname } from 'node:path';

export default function copyStaticFiles(
  source: string,
): Plugin {
  return {
    name: copyStaticFiles.name,
    setup({ onEnd, initialOptions }) {
      onEnd(() => cpSync(source, initialOptions.outdir || dirname(initialOptions.outfile!), {
        dereference: true,
        errorOnExist: false,
        force: true,
        preserveTimestamps: true,
        recursive: true,
      }));
    },
  };
}
