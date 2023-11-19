import run from 'bundler/run';

export default async function development(context: MainContext) {
  await Promise.all(context.projects.map((project) => run(project, context.path, false)));
}
