import { Plugin } from 'esbuild';
import { rmSync } from 'node:fs';

export default function cleanOutputFiles(): Plugin {
  return {
    name: cleanOutputFiles.name,
    setup({ onStart, initialOptions }) {
      onStart(() => rmSync(
        initialOptions.outdir,
        { recursive: true, force: true },
      ));
    },
  };
}
