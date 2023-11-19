type Arguments = {
  readonly project?: string;
  readonly preset?: string;
  readonly commands: string[];
  readonly public?: boolean;
};

type BundlerOptions = {
  readonly name?: string;
  readonly preset: string;
  readonly entry?: string;
  readonly output?: string;
  readonly daemon?: boolean;
  readonly http?: {
    readonly host?: string;
    readonly port?: number;
  };
  readonly silent?: boolean;
  readonly watch?: string[];
};

type MainContext = {
  readonly projects: BundlerOptions[]
  readonly path: string;
};

type PackageJson = {
  readonly dependencies: Record<string, string>;
  readonly devDependencies: Record<string, string>;
  readonly x: BundlerOptions[];
};

type PresetIn = {
  readonly bunlderOptions: BundlerOptions;
  readonly production: boolean;
  readonly path: string;
};

type PresetOut<T> = {
  readonly buildOptions: T;
  readonly watchable?: boolean;
  readonly servable?: boolean;
};
