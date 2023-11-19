export enum ArgumentType {
  Enum,
  String,
  Boolean,
}

type ArgumentBase<T> = {
  readonly type: T;
  readonly name: string;
};

type EnumArgument = ArgumentBase<ArgumentType.Enum> & {
  readonly values: string[];
};
type StringArgument = ArgumentBase<ArgumentType.String>;
type BooleanArgument = ArgumentBase<ArgumentType.Boolean>;

type SchemaArgumentItem = EnumArgument | StringArgument | BooleanArgument;

export default function parseArguments<T>(
  argv: string[],
  schema: SchemaArgumentItem[],
): T {
  const result = {
    commands: [] as string[],
  };

  for (let i = 0; i < argv.length; i += 1) {
    const currentArgument = argv[i];
    const nextArgument = argv[i + 1];

    if (currentArgument.startsWith('--')) {
      const currentArgumentName = currentArgument.slice(2);
      const argument = schema.find(
        ({ name }) => name === currentArgumentName,
      );
      if (!argument) {
        throw new Error('invalid argument');
      }
      switch (argument.type) {
        case ArgumentType.Enum:
          if (!argument.values.includes(nextArgument)) {
            throw new Error('invalid enum argument');
          }
          result[currentArgumentName] = nextArgument;
          i += 1;
          break;
        case ArgumentType.String:
          if (!nextArgument) {
            throw new Error('no next argument');
          }

          if (nextArgument.startsWith('--')) {
            throw new Error('next argument is a value');
          }

          result[currentArgumentName] = nextArgument;
          i += 1;
          break;
        case ArgumentType.Boolean:
          result[currentArgumentName] = true;
          break;
        default:
          break;
      }
    } else {
      result.commands.push(currentArgument);
    }
  }

  return result as T;
}
