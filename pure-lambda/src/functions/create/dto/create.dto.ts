import { IsString } from 'class-validator';

export class CreateDto {
  @IsString({ message: 'Type should be a string' })
  type: string;
}
