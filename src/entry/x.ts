import MainException from 'exception/main-exception';
import exec from 'exec';
import doProjectSettingsFileExist from 'helper/do-project-settings-file-exist';
import getProjects from 'helper/get-projects';
import log from 'lib/log';

import parseArguments, { ArgumentType } from 'lib/parse-arguments';

async function main() {
  const [, , ...argv] = process.argv;

  const settings = parseArguments<Arguments>(argv, [
    {
      type: ArgumentType.String,
      name: 'project',
    },
    {
      type: ArgumentType.String,
      name: 'preset',
    },
    {
      type: ArgumentType.Boolean,
      name: 'public',
    },
  ]);

  const path = settings.project || process.cwd();

  if (!settings.commands.length) {
    log('NOPE');
    return;
  }

  if (!await doProjectSettingsFileExist(path)) {
    log('The current folder is not a X project');
    return;
  }

  const projects = await getProjects(path);

  const mainContext: MainContext = {
    path,
    projects,
  };

  try {
    await exec(settings.commands[0], mainContext);
  } catch (e) {
    if (e instanceof MainException) {
      log(`${e.name}: ${e.message}`);
      return;
    }

    throw e;
  }
}

await main();
