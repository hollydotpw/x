import { BuildContext, BuildOptions, ServeOptions } from 'esbuild';
import { join } from 'node:path';

export default async function serve(
  buildContext: BuildContext<BuildOptions>,
  serveOptions: ServeOptions,
) {
  await buildContext.serve({
    servedir: serveOptions.servedir,
    fallback: join(serveOptions.servedir!, 'index.html'),
    host: serveOptions.host,
    port: serveOptions.port,
  });
}
