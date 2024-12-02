import { IsNumber, IsString, MinLength } from 'class-validator';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';

export class UpdateTransactionDto {
  title: string;

  @IsNumber()
  amount: number;

  @IsString()
  @MinLength(6)
  type: 'expenses' | 'income';

  category: Category;

  user: User;
}
