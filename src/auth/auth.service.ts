import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { AuthUserDto } from './dto/auth.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(authUserDto: AuthUserDto): Promise<any> {
    const user = await this.userService.findUserByNickName(
      authUserDto.nickName,
    );
    if (!user) {
      throw new UnauthorizedException('User not found');
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        authUserDto.password,
        user.password,
      );
      if (isPasswordCorrect) {
        const payload = { nickName: user.nickName, id: user.id };
        const jwtToken = await this.jwtService.signAsync(payload);
        await this.userService.updateJwtToken(jwtToken, user);
        return { jwtToken };
      } else {
        throw new UnauthorizedException('Password is not correct');
      }
    }
  }
}
