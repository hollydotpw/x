import { BuildOptions } from 'esbuild';

export default function webworkerPreset({ bunlderOptions }: PresetIn): PresetOut<BuildOptions> {
  return {
    watchable: true,
    buildOptions: {
      entryPoints: [bunlderOptions.entry],
      jsxFactory: 'h',
      jsxImportSource: 'preact',
      platform: 'node',
    },
  };
}
