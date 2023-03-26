import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
declare const AuthService_base: new (...args: any[]) => any;
export declare class AuthService extends AuthService_base {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validate(login: string, password: string): Promise<any>;
    generateJwtToken(user: any): string;
    comparePasswords(password: string, userPassword: string): Promise<boolean>;
    verifyJwtToken(token: string): Promise<any>;
    checkTokenValidity(token: string): Promise<any>;
    getItemByCodebar(item: string): Promise<any>;
}
export {};
