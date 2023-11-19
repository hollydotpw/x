import copyStaticFiles from 'bundler/plugins/copy-static-files';
import { BuildOptions } from 'esbuild';
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';
import { join } from 'node:path';

export default function browserPreset(
  { path, production, bunlderOptions }: PresetIn,
): PresetOut<BuildOptions> {
  return {
    servable: true,
    buildOptions: {
      entryPoints: [bunlderOptions.entry || './src/entry.tsx'],
      platform: 'browser',
      jsxFactory: 'h',
      jsxImportSource: 'preact',
      // splitting: true,
      entryNames: 'asset/[ext]/[name]',
      chunkNames: production ? 'asset/[ext]/[hash]' : 'asset/[ext]/[name]-[hash]',
      external: ['*.woff', '*.woff2', '*.ttf'],
      plugins: [
        copyStaticFiles(join(path, './static')),
        sassPlugin({
          loadPaths: ['src'],
          transform: postcssModules({
            basedir: '',
            generateScopedName: production
              ? '[hash:base64:4]'
              : '[local]-[hash:base64:4]',
          }),
        }),
      ],
    },
  };
}
