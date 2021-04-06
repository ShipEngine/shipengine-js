const { promisify } = require("util");
const { exec } = require("child_process");

module.exports.p = {
  exec: async (cmd) => {
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
