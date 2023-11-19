type Printable = string | boolean | number;

export function print(text: string) {
  process.stdout.write(text);
}

export function printLn(...text: Printable[]) {
  return print(`${text.join('')}\n`);
}

export default function log(...text: Printable[]) {
  return printLn(`\x1b[0;32m[x] \x1b[0;34m${text.join(' ')}\x1b[m`);
}
