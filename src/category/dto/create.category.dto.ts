import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateCategoryDto {
  @IsNotEmpty() // обезательное условие
  title: string;

  @IsOptional() // опциональное условие
  user?: User;
}
