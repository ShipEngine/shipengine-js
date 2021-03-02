/* create-tags.ts */
/* initialize */
import { default as ShipEngine } from '../../src';

import 'dotenv/config';
const shipengine = new ShipEngine(process.env.API_KEY);

/* wrapper start */
(async () => {
  try {
    const response = await shipengine.tags.create({ name: 'MY_TAG' });
    console.log(response);
  } catch (err) {
    console.error(err);
  }

  try {
    const response = await shipengine.createTag('MY_TAG');
    console.log(response);
  } catch (err) {
    console.error(err);
  }
  /* wrapper end */
})();
