import { Container } from 'inversify';

import { servicesBinding } from './app.di-binding';
import { handlersBinding } from './app.di-binding';

export const appDiContainer = new Container();
appDiContainer.load(servicesBinding);
appDiContainer.load(handlersBinding);
