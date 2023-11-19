import development from 'command/development';
import lintFix from 'command/lint-fix';
import lint from 'command/lint';
import production from 'command/production';
import debloat from 'command/debloat';
import bloat from 'command/bloat';

import log from 'lib/log';

export default function exec(command: string, context: MainContext) {
  switch (command) {
    case 'dev':
    case 'd':
    case 'develoment':
      return development(context);
    case 'p':
    case 'build':
    case 'prod':
    case 'production':
      return production(context);
    case 'l':
    case 'lint':
      return lint(context.path);
    case 'lf':
    case 'lint-fix':
      return lintFix(context.path);
    case 'debloat':
      return debloat(context.path);
    case 'b':
    case 'i':
    case 'bloat':
    case 'init':
      return bloat(context);
    default:
      return log("ain't that");
  }
}
