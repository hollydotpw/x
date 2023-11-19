import { execSync } from 'node:child_process';
import log from 'lib/log';

export default function exec(
  command: string,
  options?: Record<string, string>,
  silent = false,
): void {
  try {
    execSync(command, { stdio: silent ? undefined : [0, 1, 2], ...options });
  } catch (error) {
    if (!silent) {
      log(`error running shitee: ${error as string}`);
    }
  }
}
