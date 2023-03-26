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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_module_1 = require("./user.module");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(login, password) {
        const userExists = await this.userModel.exists({ login });
        if (userExists) {
            throw new common_1.HttpException(`User ${login} already exists`, common_1.HttpStatus.CONFLICT);
        }
        const createdUser = new this.userModel({ login, password });
        return createdUser.save();
    }
    async getUserByLogin(login) {
        const user = await this.userModel.findOne({ login }).exec();
        return user !== null && user !== void 0 ? user : null;
    }
    async updateUser(userId, login, password) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.HttpException(`User ${userId} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        if (login) {
            const userWithLogin = await this.userModel.findOne({ login }).exec();
            if (userWithLogin && userWithLogin._id.toString() !== userId) {
                throw new common_1.HttpException(`Login ${login} already exists`, common_1.HttpStatus.CONFLICT);
            }
            user.login = login;
        }
        if (password) {
            user.password = password;
        }
        return user.save();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_module_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map