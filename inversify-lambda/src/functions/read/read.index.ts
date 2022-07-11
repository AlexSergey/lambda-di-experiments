import 'reflect-metadata';

import { ReadHandler } from './read.handler';
import { createLambda } from '../core/create-lambda';
import { appDiContainer } from '../../app/app.di-container';

const read = createLambda(ReadHandler, appDiContainer);

export default read;
