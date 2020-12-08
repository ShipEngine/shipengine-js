import fs from 'fs';
import path from 'path';

const generateLit = async (fileName = '') => {
  const mdPath = path.join(__dirname, `${fileName}.md`);
  const litPath = path.join(__dirname, `${fileName}.lit`);
  const r = await fs.promises.readFile(mdPath, {
    encoding: 'utf8',
  });
  const result = r
    .replace(/```.*\n/g, '') // remove ```ts
    .replace(/#\s/, '@title ') // convert md h1 to title
    .replace(/##?#/g, '@s'); // conver md h2 or h2 to @s

  return fs.promises.writeFile(litPath, result);
};

const main = async () => {
  await generateLit('addresses');
};

main();
