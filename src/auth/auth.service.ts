import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/interfaces/createUserDto';
import { UserDocument } from '../user/schemes/user.scheme';
import { UsersService } from '../user/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<UserDocument> {
    const user = await this.usersService.findValidate(payload);
    return user;
  }

  async signup(user: CreateUserDto): Promise<string> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    return this.generateToken(newUser);
  }

  async signin(email: string, password: string): Promise<string> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      return await this.generateToken(user);
    }
  }

  private generateToken(user: UserDocument): string {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    };
    return this.jwtService.sign(payload);
  }
}
