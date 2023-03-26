/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.module';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async createUser(login: string, password: string): Promise<User> {
    const userExists = await this.userModel.exists({ login });

    if (userExists) {
      throw new HttpException(`User ${login} already exists`, HttpStatus.CONFLICT);
    }

    const createdUser = new this.userModel({ login, password });
    return createdUser.save();
  }

  async getUserByLogin(login: string): Promise<User | null> {
    const user = await this.userModel.findOne({ login }).exec();
    return user ?? null;
  }

  async updateUser(userId: string, login: string, password: string): Promise<User | null> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new HttpException(`User ${userId} not found`, HttpStatus.NOT_FOUND);
    }

    if (login) {
      const userWithLogin = await this.userModel.findOne({ login }).exec();

      if (userWithLogin && userWithLogin._id.toString() !== userId) {
        throw new HttpException(`Login ${login} already exists`, HttpStatus.CONFLICT);
      }

      user.login = login;
    }

    if (password) {
      user.password = password;
    }

    return user.save();
  }
}