/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './user/auth.service';
import { jwtConstants } from './user/user.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:root@cluster0.u3uwtci.mongodb.net/?retryWrites=true&w=majority'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
    ],
    controllers: [AppController, UserController],
    providers: [AppService, UserService, AuthService],
})
export class AppModule { }