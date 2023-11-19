import fileMap from './static-files.json';

const map = new Map<string, string>(fileMap as [string, string][]);

export default map;
