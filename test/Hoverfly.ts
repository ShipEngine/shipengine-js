import { ChildProcess, exec } from 'child_process';
import { p } from './utils';

let subshell: ChildProcess | null = null;
export class Hoverfly {
  static async start() {
    return new Promise((resolve, reject) => {
      subshell = exec(
        'hoverfly -webserver -response-body-files-path simengine > /dev/null &'
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

  static async import(file: string) {
    return p.exec(`hoverctl import simengine/v1/${file}`);
  }
  static async flush() {
    return p.exec(`hoverctl flush cache`);
  }
  static async stop() {
    return p.exec('hoverctl stop');
  }
}
