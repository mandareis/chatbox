"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDatabase = void 0;
class InMemoryDatabase {
    constructor() {
        this.users = [
            {
                id: "2b166ddcee3f407eb82612236c9ea977",
                email: "amanda@depaula.xyz",
                name: "Amanda De Paula",
                bcrypt_password: "$2a$10$abKmvVVFG6XMOH2jM7yeb.x6M9rA2j7WV69BWTmXRlPGFtO6L7JL2",
                created_at: "2021-04-10T17:34:11+00:00",
            },
        ];
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let u of this.users) {
                if (u.email === email) {
                    return Object.assign({}, u);
                }
            }
            return null;
        });
    }
    getUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let u of this.users) {
                if (u.id === id) {
                    return Object.assign({}, u);
                }
            }
            return null;
        });
    }
    makeid(length) {
        var result = [];
        var characters = "abcdef0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join("");
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.getUserByEmail(user.email)) {
                throw new Error("duplicate email");
            }
            user.id = this.makeid(32);
            this.users.push(user);
            return user;
        });
    }
}
exports.InMemoryDatabase = InMemoryDatabase;
//# sourceMappingURL=database.js.map