import { BuildOptions, context as createBuildContext } from 'esbuild';
import { basename, join } from 'node:path';

import log from 'lib/log';
import RunException from 'exception/run-exception';
import cleanOutputFiles from './plugins/clean-output-files';
import logger from './plugins/logger';

import webworkerPreset from './presets/webworker';
import browserPreset from './presets/browser';
import serve from './serve';
import bunPreset from './presets/bun';

type PresetFn = (presetIn: PresetIn) => PresetOut<BuildOptions>;

// TODO: the presets should be an esbuild plugin
const presets: Record<string, PresetFn> = {
  'browser-preact': browserPreset,
  'webworker-preact': webworkerPreset,
  bun: bunPreset,
};

export default async function run(
  bunlderOptions: BundlerOptions,
  path: string,
  production: boolean,
) {
  const name = bunlderOptions.name || basename(path);

  const outdir = join(path, 'dist', name);

  const createBuildOptions = presets[bunlderOptions.preset];

  if (!createBuildOptions) {
    throw new RunException(`Preset ${bunlderOptions.preset} not found`);
  }

  const {
    buildOptions,
    watchable,
    servable,
  } = createBuildOptions({ path, production, bunlderOptions });

  const buildContext = await createBuildContext({
    bundle: true,
    outdir,
    jsx: 'automatic',
    minify: production,
    target: 'esnext',
    tsconfigRaw: {
      compilerOptions: {
        baseUrl: 'src',
        rootDir: 'src',
        moduleResolution: 'NodeNext',
        resolveJsonModule: true,
        module: 'NodeNext',
        esModuleInterop: true,
        target: 'ESNext',
        lib: [
          'ESNext',
          'DOM',
        ],
      },
    },
    entryNames: 'entry',
    define: {
      __PRESET__: JSON.stringify(bunlderOptions.preset),
      __PRODUCTION__: JSON.stringify(production),
      __DEVELOMENT__: JSON.stringify(!production),
    },
    ...buildOptions,
    plugins: [
      ...buildOptions.plugins || [],
      cleanOutputFiles(),
      logger(name, production),
    ].filter(Boolean),
  });

  if (production) {
    await buildContext.rebuild();
    await buildContext.dispose();
    return;
  }

  if (watchable) {
    await buildContext.watch();
    return;
  }

  if (!servable) {
    return;
  }

  const port = bunlderOptions.http?.port ?? 5000;
  const host = bunlderOptions.http?.host ?? 'localhost';

  await serve(buildContext, {
    servedir: bunlderOptions.output || outdir,
    host,
    port,
  });

  log('Serving', name, 'at', `http://${host}:${port}`);
}
