import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
      throw new BadRequestException('This nickname is already in use');
    } else {
      const saltOrRounds = 10;
      const password = createUserDto.password;
      createUserDto.password = await bcrypt.hash(password, saltOrRounds);
      const newUser = await this.userRepository.save(createUserDto);
      return { newUser };
    }
  }

  async findUserByNickName(nickName: string) {
    return await this.userRepository.findOne({ where: { nickName } });
  }

  async updateJwtToken(jwtToken: string, user: any): Promise<User> {
    user.jwt_token = jwtToken;
    return await this.userRepository.save(user);
  }

  async findUser(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}

// for test
/*
{
  "fistName": "Name1",
  "lastName": "Lastname1",
  "nickName": "nick1",
  "password": "password123"
}

*/
