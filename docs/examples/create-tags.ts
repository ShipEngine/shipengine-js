/* create-tags.ts */
/* initialize */
import { default as ShipEngine } from '../../src';

import 'dotenv/config';
const shipengine = new ShipEngine(process.env.API_KEY);

/* wrapper start */
(async () => {
  /* either */
  const response = await shipengine.tags.create('MY_TAG');
  if (response.type === 'success') {
    console.log('Tag created!', response.result.name);
  } else {
    console.error('error', response.error.message);
  }

  console.assert(response.type !== 'error', 'Tag should be successful');

  /* wrapper end */
})();
