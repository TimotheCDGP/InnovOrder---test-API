import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './user.module';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.userService.getUserByLogin(login);

    if (!user || user.password !== password) {
      return null;
    }

    const token = this.generateJwtToken(user);
    return {
      userId: user.id,
      login: user.login,
      token: token,
    };
  }

  generateJwtToken(user: any): string {
    const payload = { login: user.login, sub: user.id };
    const token = this.jwtService.sign(payload, { secret: jwtConstants.secret, expiresIn: jwtConstants.expiresIn });
    return token;
  }

  async comparePasswords(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return password == userPassword;
  }

  async verifyJwtToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token, { secret: jwtConstants.secret });
      const user = await this.userService.getUserByLogin(decoded.login);
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
  // Check if token is valid by username + exp date
  async checkTokenValidity(token: string): Promise<any> {
    try {

      // Token is decoded
      const decoded = this.jwtService.verify(token, { secret: jwtConstants.secret });

      // Check if user is valid
      const user = this.userService.getUserByLogin(decoded.login);
      if (user) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (currentTimestamp < decoded.exp) {
          return true
        }
        else { return false }
      } else { return false }
    } catch (e) {
      return false;
    }
  }

  // Serach an item by it's codebar with OpenFoodFacts API
  async getItemByCodebar(item: string): Promise<any> {
    return axios.get(`https://world.openfoodfacts.org/api/v3/product/${item}.json`)
      .then((response: { data: { product: any; }; }) => {
        const data = response.data.product;
        return data;
      })
      .catch((error: any) => {
        return "ERROR : Invalid codebar !"
      });
  }
}