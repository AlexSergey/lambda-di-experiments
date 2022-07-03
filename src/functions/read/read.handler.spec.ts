import { createLambda } from '../core';
import { appDiContainer } from '../../app/app.di-container';
import { ReadHandler } from './read.handler';

describe('Read lambda test. Positive cases', () => {
  it('Read data. Get list of items', async () => {
    const read = createLambda(ReadHandler, appDiContainer);
    const result = await read();
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'list of items',
        })
    });
  });
});
