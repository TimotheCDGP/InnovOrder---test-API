import { Model } from 'mongoose';
import { User, UserDocument } from './user.module';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(login: string, password: string): Promise<User>;
    getUserByLogin(login: string): Promise<User | null>;
    updateUser(userId: string, login: string, password: string): Promise<User | null>;
}
