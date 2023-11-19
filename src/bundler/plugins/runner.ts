import { Plugin } from 'esbuild';
import { join } from 'node:path';

export default function runner(runtime: 'node' | 'bun'): Plugin {
  return {
    name: runner.name,
    setup({ onEnd, initialOptions }) {
      onEnd(async () => {
        const process = Bun.spawn([runtime, join(initialOptions.outdir!, `${initialOptions.entryNames}.js`)], {
          stdout: 'inherit',
        });

        await process.exited;
      });
    },
  };
}
