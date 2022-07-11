import 'reflect-metadata';

import { createLambda } from '../core/create-lambda';
import { CreateHandler } from './create.handler';

const create = createLambda(CreateHandler);

export default create;
