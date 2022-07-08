import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate as classValidate } from 'class-validator';

export const validation = (dto: ClassConstructor<object>) => {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(...params: any[]) => Promise<any>>) => {
    let oldFunc = descriptor.value;
    descriptor.value = async function () {
      const args = Array.from(arguments);
      const event = args[0];
      const body = this.bodyParser(event);
      const instance = plainToInstance(dto, body);
      const errors = await classValidate(instance);

      if (errors.length > 0) {
        const errorsData = errors.reduce<Record<string, string>>((src, error) => {
          if (error.constraints) {
            src[error.property] = Object.values(error.constraints).join(', ');
          }
          return src;
        }, {});
        return this.fail(errorsData);
      } else {
        return await oldFunc.apply(this, args);
      }
    }
  }
}
