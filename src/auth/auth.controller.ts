import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth.user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() authUserDto: AuthUserDto) {
    return this.authService.login(authUserDto);
  }
}

/*
{
  "nickName": "nick1",
  "password": "password123"
}
*/
