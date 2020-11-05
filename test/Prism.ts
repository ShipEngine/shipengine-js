import { ChildProcess, exec } from 'child_process';
import { kill } from 'process';

// there is actually a class that works with this.
let subshell: ChildProcess | null = null;

export class Prism {
  static async start() {
    return new Promise((resolve, reject) => {
      subshell = exec(
        'prism mock node_modules/shipengine-openapi/openapi.json > /dev/null &'
      );
      subshell.stderr?.on('data', (r) => {
        console.error(r);
        reject(r);
      });
      subshell.stdout?.on('end', resolve);
      subshell.stdout?.on('close', resolve);
      subshell.stdout?.on('error', (err) => {
        console.error(err);
        resolve(err);
      });
    });
  }
  static async stop() {
    if (subshell) {
      console.log(subshell.pid);
      await kill(subshell.pid, 'SIGINT');
    }
    console.log('shut down!');
  }
}
