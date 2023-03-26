import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    createUser(login: string, password: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        user: import("./user.module").User;
    }>;
    login(login: string, password: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        token: string;
    }>;
    searchForProduct(productId: string, authorization: string): Promise<any>;
    updateUser(userId: string, login: string, password: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        user: import("./user.module").User;
    }>;
}
