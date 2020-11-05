import { exec } from 'child_process';
import { promisify } from 'util';
import { ShipEngine } from '../src/index';
const api = new ShipEngine('foo', 'http://localhost:8500/v1');
beforeAll(async () => {
  /*   const { stderr, stdout } = await promisify(exec)(
    'hoverfly -webserver -response-body-files-path simengine'
  );
  console.log(stdout);
  console.error(stderr); */
});

afterAll(async () => {
  // await promisify(exec)('hoverctl stop');
});

describe('tags', () => {
  it('should get tags', async () => {
    const data = await api.createTag('foo');
    console.log(data);
  });
});
