import 'reflect-metadata';

import { createLambda } from '../core/create-lambda';
import { ReadHandler } from './read.handler';

const read = createLambda(ReadHandler);

export default read;
