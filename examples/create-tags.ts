/* create-tags.ts */
/* initialize */
import { default as ShipEngine } from '../../src';

import 'dotenv/config';
const shipengine = new ShipEngine(process.env.API_KEY);

/* wrapper start */
(async () => {
  /* either */
  const response = await shipengine.createTag('MY_TAG');
  if (response.type === 'success') {
    console.log('Tag created!', response.result);
  } else {
    console.error('error', response.error);
  }

  console.assert(response.type !== 'error', 'Tag should be successful');

  /* wrapper end */
})();
