import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemes/user.scheme';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from './interfaces/createUserDto';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  findOne(id: string): Promise<UserDocument | undefined> {
    return this.UserModel.findById(id);
  }

  findByEmail(email: string): Promise<UserDocument | null> {
    return this.UserModel.findOne({ email }).exec();
  }

  create(user: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.UserModel(user);
    return createdUser.save();
  }

  findValidate(user: JwtPayload): Promise<UserDocument | undefined> {
    return this.UserModel.findOne({
      _id: user.id,
      email: user.email,
      firstName: user.firstName,
    });
  }
}
