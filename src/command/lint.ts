import { printLn } from 'lib/log';
import run from 'linter/run';

export default async function lint(path: string) {
  const output = await run(path, false);

  printLn(output);
}
