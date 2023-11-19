import { Plugin } from 'esbuild';
import log from 'lib/log';

export default function logger(name: string, production: boolean): Plugin {
  return {
    name: logger.name,
    setup({ onEnd, onStart }) {
      let start: number;

      onStart(() => {
        start = Date.now();
      });

      onEnd(() => {
        log('Build', name, 'for', production ? 'production' : 'development', '-', `${Date.now() - start}ms`);
      });
    },
  };
}
