// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Review } = initSchema(schema);

export {
  Review
};