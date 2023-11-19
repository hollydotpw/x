import { BuildOptions } from 'esbuild';

import runner from '../plugins/runner';

export default function bunPreset(
  { bunlderOptions, production }: PresetIn,
): PresetOut<BuildOptions> {
  return {
    watchable: true,
    buildOptions: {
      entryPoints: [bunlderOptions.entry],
      platform: 'node',
      plugins: bunlderOptions.daemon && production ? [] : [
        runner('bun'),
      ],
    },
  };
}
