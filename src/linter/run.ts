import { ESLint, Linter } from 'eslint';
import { resolve } from 'node:path';
import staticFiles from 'constant/static-files';

export default async function lint(path: string, fix: boolean): Promise<string> {
  // TODO: use flat configs, thank you
  const eslint = new ESLint({
    fix,
    useEslintrc: false,
    allowInlineConfig: true,
    baseConfig: JSON.parse(staticFiles.get('.eslintrc.json')) as Linter.Config,
  });
  const results = await eslint.lintFiles(resolve(path, 'src'));

  if (fix) {
    await ESLint.outputFixes(results);
  }

  const formatter = await eslint.loadFormatter('stylish');

  return formatter.format(results);
}
