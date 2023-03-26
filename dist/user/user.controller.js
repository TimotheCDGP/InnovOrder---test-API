"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_service_1 = require("./auth.service");
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async createUser(login, password) {
        if (!login || !password) {
            throw new common_1.HttpException('Login or password missing', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdUser = await this.userService.createUser(login, password);
        if (createdUser) {
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'New user sucessfully added to database',
                user: createdUser,
            };
        }
        else {
            throw new common_1.HttpException('Unable to add new user to database', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async login(login, password) {
        const user = await this.userService.getUserByLogin(login);
        if (!user) {
            throw new common_1.HttpException('Invalid login or password', common_1.HttpStatus.UNAUTHORIZED);
        }
        const isMatch = await this.authService.comparePasswords(password, user.password);
        if (!isMatch) {
            throw new common_1.HttpException('Invalid login or password', common_1.HttpStatus.UNAUTHORIZED);
        }
        const token = this.authService.generateJwtToken(user);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'User logged in successfully',
            token,
        };
    }
    async searchForProduct(productId, authorization) {
        authorization = authorization.split(' ')[1];
        const isTokenValid = await this.authService.checkTokenValidity(authorization);
        if (isTokenValid) {
            return this.authService.getItemByCodebar(productId);
        }
        else {
            return {
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: 'Invalid token !',
            };
        }
    }
    async updateUser(userId, login, password) {
        if (!login || !password) {
            throw new common_1.HttpException('Login or password missing', common_1.HttpStatus.BAD_REQUEST);
        }
        const updatedUser = await this.userService.updateUser(userId, login, password);
        if (updatedUser) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'User updated successfully',
                user: updatedUser,
            };
        }
        else {
            throw new common_1.HttpException('Unable to update user', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('login')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)('login')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/product/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchForProduct", null);
__decorate([
    (0, common_1.Put)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)('login')),
    __param(2, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map