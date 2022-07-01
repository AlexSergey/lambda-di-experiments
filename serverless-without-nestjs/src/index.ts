import { ReadHandler } from './functions/read.handler';
import { createLambda } from './functions/core';

const read = createLambda(ReadHandler);
export { read };
