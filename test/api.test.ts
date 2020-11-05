import { exec as execCb } from 'child_process';
import { promisify } from 'util';
import { ShipEngine } from '../src/index';

const exec = async (cmd: string) => {
  const { stderr, stdout } = await promisify(execCb)(cmd);
  if (stderr) {
    console.error(stderr);
    throw stderr;
  }
  return stdout;
};
class Hoverfly {
  static async start() {
    return exec('hoverfly -webserver -response-body-files-path simengine &');
  }

  static async import(file: string) {
    return exec(`hoverctl import simengine/v1/${file}`);
  }
  static async flush() {
    return exec(`hoverctl flush cache`);
  }
  static async stop() {
    await Hoverfly.flush();
    return exec('hoverctl stop');
  }
}

describe('hoverfly - tags', () => {
  beforeAll(async () => {
    Hoverfly.start();
    process.env.BASE_URL = 'http://localhost:8500/v1';
  });
  afterAll(() => {
    Hoverfly.stop();
  });
  it('should create tag / return created tag', async () => {
    await Hoverfly.import('tags.json');
    const api = new ShipEngine('foo');
    const res = await api.createTag('foo');
    expect(res.name).toBe('foo');
  });
});

/* describe('prism - tags', () => {
  beforeAll(() => {
    process.env.BASE_URL = 'http://localhost:8500/v1';
  });
  it('should create tag / return created tag', async () => {
    const api = new ShipEngine('foo');
    const res = await api.createTag('foo');
    expect(res.name).toBe('foo');
  });
});
 */
