// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Review, User } = initSchema(schema);

export {
  Review,
  User
};