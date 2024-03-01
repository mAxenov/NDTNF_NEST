import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/interfaces/createUserDto';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';

@Controller('api/users')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() user: CreateUserDto): Promise<{ token: string }> {
    const token = await this.authService.signup(user);
    return { token };
  }

  @Post('signin')
  async signin(
    @Body() signinDto: { email: string; password: string },
  ): Promise<{ token: string }> {
    const { email, password } = signinDto;
    const token = await this.authService.signin(email, password);
    return { token };
  }
}
