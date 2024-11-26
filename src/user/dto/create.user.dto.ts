import { MinLength } from 'class-validator';

export class CreateUserDto {
  fistName: string;
  lastName: string;
  nickName: string;

  @MinLength(6, { message: 'Password need to be more 6 symbols' })
  password: string;
}
