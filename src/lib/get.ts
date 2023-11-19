import https from 'node:https';

export default function get<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const data: Buffer[] = [];

    https
      .get(url, (res) => {
        res.on('data', (chunk: Buffer) => {
          data.push(chunk);
        });

        res.on('end', () => resolve(JSON.parse(Buffer.concat(data).toString()) as T));
      })
      .on('error', reject);
  });
}
