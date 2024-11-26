import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  async findAll() {
    return 'This action returns all users';
  }

  async findUser(id: number) {
    return `This action returns a #${id} user`;
  }
}
