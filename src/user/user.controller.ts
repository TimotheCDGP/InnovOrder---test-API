import { Controller, Post, Body, HttpStatus, HttpException, Param, Headers, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Post()
  async createUser(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    // Throw exception if user didn't provide login/password
    if (!login || !password) {
      throw new HttpException(
        'Login or password missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = await this.userService.createUser(login, password);

    if (createdUser) {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'New user sucessfully added to database',
        user: createdUser,
      };
    } else {
      throw new HttpException(
        'Unable to add new user to database',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/login')
  async login(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.getUserByLogin(login);

    if (!user) {
      throw new HttpException('Invalid login or password', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await this.authService.comparePasswords(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid login or password', HttpStatus.UNAUTHORIZED);
    }

    const token = this.authService.generateJwtToken(user)

    return {
      statusCode: HttpStatus.OK,
      message: 'User logged in successfully',
      token,
    };
  }
  // Search item by coadebar if authorized
  @Post('/product/:productId')
  async searchForProduct(@Param('productId') productId: string, @Headers('authorization') authorization: string) {
    authorization = authorization.split(' ')[1];
    const isTokenValid = await this.authService.checkTokenValidity(authorization)

    if (isTokenValid) {
      // do the search with openfoodfacts API
      return this.authService.getItemByCodebar(productId)
    }
    else {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token !',
      };
    }
  }

  @Put('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    // Throw exception if user didn't provide login/password
    if (!login || !password) {
      throw new HttpException(
        'Login or password missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedUser = await this.userService.updateUser(userId, login, password);

    if (updatedUser) {
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        user: updatedUser,
      };
    } else {
      throw new HttpException(
        'Unable to update user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}