/* eslint-disable @typescript-eslint/no-var-requires */

const { exec, execSync } = require('child_process');

beforeAll(() => {
  execSync(
    'hoverfly -webserver -response-body-files-path simengine > /dev/null &'
  );
});

afterAll(() => {
  execSync('hoverctl stop');
});
