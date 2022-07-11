import 'reflect-metadata';

import { CreateHandler } from './create.handler';
import { createLambda } from '../core/create-lambda';
import { appDiContainer } from '../../app/app.di-container';

const create = createLambda(CreateHandler, appDiContainer);

export default create;
