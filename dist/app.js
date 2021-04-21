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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const email_validator_1 = __importDefault(require("email-validator"));
const database_1 = require("./database");
const cookie_session_1 = __importDefault(require("cookie-session"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = new database_1.InMemoryDatabase();
const app = express_1.default();
app.set("trust proxy", 1);
app.use(cookie_session_1.default({
    name: "session",
    keys: ["b2cc1685-6c47-4faf-8cf3-e6aed3c04e0"],
    maxAge: 48 * 60 * 60 * 1000, // 48 hours
}));
app.use((req, res, next) => {
    if (req.session && !req.session.started) {
        req.session.started = new Date().toISOString();
    }
    next();
});
app.use(express_1.default.json());
const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
//sets user to "_bootstrap_data" if user_id is in session
app.get("/_bootstrap.js", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set("content-type", "text/javascript");
    // load the user from the database done
    // dont forget to clear bcrypt_password! maybe?
    // pass into stringify done
    // use a <script> tag to import this in the HTML
    // use _boostrap_data as initial state in the userSlice
    let user = null;
    if (req.session && req.session.user_id) {
        user = yield db.getUserByID(req.session.user_id);
        delete user.bcrypt_password;
    }
    // if user is not logged in send in null.
    res.send(`window._bootstrap_data = JSON.parse('${JSON.stringify(user)}')`);
}));
// logs user in over fetch & checks to validate credentials
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let user = yield db.getUserByEmail(req.body.email);
        if (!user) {
            console.log("login: unknown user");
            apiError(res, "Invalid credentials", 400);
            return;
        }
        let ok = yield bcrypt_1.default.compare(req.body.password, user.bcrypt_password);
        if (!ok) {
            console.log("login: wrong password");
            apiError(res, "Invalid credentials", 400);
            return;
        }
        delete user.bcrypt_password;
        //would only happen if cookie session was not added
        if (!req.session) {
            throw new Error("no session available!");
        }
        req.session.user_id = user.id; // log the user in
        res.json({ status: "ok", user });
    }
    catch (e) {
        console.error(`unknown failure occured: ${e.message}`);
        apiError(res, "Internal server error", 500);
    }
}));
//logs user out by deleting session
app.delete("/api/session", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session = null;
    res.json({ status: "ok" });
}));
//sets response format of errors in API
function apiError(res, message, status) {
    res.set("Content-Type", "application/json");
    res.status(status).json({
        status: "error",
        message,
    });
}
// GET /users — index/listing
// POST /users — create
// GET /users/{user_id} — read
// PUT /users/{user_id} — update
// DELETE /users/{user_id} — destroy
app.get("/api/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield db.getUserByID(req.params.id);
        if (!user) {
            apiError(res, "Unknown user", 404);
            return;
        }
        // never reveal password hashes over the API
        delete user.bcrypt_password;
        res.json(user);
    }
    catch (e) {
        console.error(`unknown failure occured: ${e.message}`);
        apiError(res, "Internal server error", 500);
    }
}));
app.post("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        if (!req.body.email) {
            apiError(res, "Must provide email", 400);
            return;
        }
        const email = req.body.email;
        if (!email_validator_1.default.validate(email)) {
            apiError(res, "Must provide valid email", 400);
            return;
        }
        if (!req.body.name) {
            apiError(res, "Must provide name", 400);
            return;
        }
        // TODO: validate password length
        if (!req.body.password) {
            apiError(res, "Must provide password", 400);
            return;
        }
        let bcryptPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        let newUser = yield db.createUser({
            email,
            name: req.body.name,
            bcrypt_password: bcryptPassword,
            created_at: new Date().toISOString(),
        });
        res.json(newUser);
    }
    catch (e) {
        console.error(`unknown failure occured: ${e.message}`);
        apiError(res, "Internal server error", 500);
    }
}));
// app.put("/api/user/:id", async (req, res) => {
//   try {
//     let user = await db.getUserByID(req.params.id);
//     if (req.body.email) {
//       const newEmail = req.body.email;
//       if (!validateEmail.validate(newEmail)) {
//         throw new Error("invalid email");
//       }
//       user.email = newEmail;
//     }
//     // user = await db.updateUser(user);
//     res.json(user);
//   } catch (e) {
//     res.json({ error: e.message }).status(400);
//   }
// });
// app.delete("/client/api/users/:id");
app.listen(PORT, () => {
    return console.log(`server is listening on ${PORT}`);
});
//# sourceMappingURL=app.js.map