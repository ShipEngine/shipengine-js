import { promisify } from 'util';
import { exec } from 'child_process';

export const p = {
  exec: async (cmd: string) => {
    const e = promisify(exec);
    const { stdout, stderr } = await e(cmd, { timeout: 2000 });
    if (stdout) {
      console.log(stdout);
      return stdout;
    }
    console.error(stderr);
    throw stderr;
  },
};
