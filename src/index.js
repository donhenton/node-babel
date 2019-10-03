import 'dotenv/config';
import {alpha,beta} from './testing'

const userCredentials = { firstname: 'Robin' };
const userDetails = { nationality: 'German' };

const user = {
  ...userCredentials,
  ...userDetails,
};

console.log(user);
console.log(alpha)

console.log(process.env.SOME_ENV_VARIABLE);
