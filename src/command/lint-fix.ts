import { printLn } from 'lib/log';
import run from 'linter/run';

export default async function lintFix(path: string) {
  const output = await run(path, true);

  printLn(output);
}
