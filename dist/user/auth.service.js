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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("./user.module");
const axios_1 = require("axios");
let AuthService = class AuthService extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(userService, jwtService) {
        super({ usernameField: 'login' });
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validate(login, password) {
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
    generateJwtToken(user) {
        const payload = { login: user.login, sub: user.id };
        const token = this.jwtService.sign(payload, { secret: user_module_1.jwtConstants.secret, expiresIn: user_module_1.jwtConstants.expiresIn });
        return token;
    }
    async comparePasswords(password, userPassword) {
        return password == userPassword;
    }
    async verifyJwtToken(token) {
        try {
            const decoded = this.jwtService.verify(token, { secret: user_module_1.jwtConstants.secret });
            const user = await this.userService.getUserByLogin(decoded.login);
            if (user) {
                return user;
            }
            else {
                return null;
            }
        }
        catch (e) {
            return null;
        }
    }
    async checkTokenValidity(token) {
        try {
            const decoded = this.jwtService.verify(token, { secret: user_module_1.jwtConstants.secret });
            const user = this.userService.getUserByLogin(decoded.login);
            if (user) {
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (currentTimestamp < decoded.exp) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
    async getItemByCodebar(item) {
        return axios_1.default.get(`https://world.openfoodfacts.org/api/v3/product/${item}.json`)
            .then((response) => {
            const data = response.data.product;
            return data;
        })
            .catch((error) => {
            console.log(error);
            return "ERROR : Invalid codebar !";
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map