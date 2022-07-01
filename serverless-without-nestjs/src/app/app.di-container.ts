import { Container } from 'inversify';

import { appBindings } from './app.di-bindings';

export const appDiContainer = new Container();
appDiContainer.load(appBindings);
