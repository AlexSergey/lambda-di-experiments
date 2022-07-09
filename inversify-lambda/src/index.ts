import 'reflect-metadata';
import { ReadHandler } from './functions/read/read.handler';
import { CreateHandler } from './functions/create/create.handler';
import { createLambda } from './functions/core/create-lambda';
import { appDiContainer } from './app/app.di-container';

const read = createLambda(ReadHandler, appDiContainer);
const create = createLambda(CreateHandler, appDiContainer);

export { create, read };
