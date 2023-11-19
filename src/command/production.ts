import run from 'bundler/run';

export default async function production(context: MainContext) {
  await Promise.all(context.projects.map((project) => run(project, context.path, true)));
}
