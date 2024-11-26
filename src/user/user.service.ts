import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { nickName: createUserDto.nickName },
    });
    if (user) {
      return 'This nickname is already in use';
    }
    const newUser = await this.userRepository.create(createUserDto);
    return { newUser };
  }

  //   async findUser(id: number) {
  //     return `This action returns a #${id} user`;
  //   }
}
