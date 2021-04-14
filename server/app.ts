import express from "express";
import validateEmail from "email-validator";
import { User, Database, InMemoryDatabase } from "./database";
import cookieSession from "cookie-session";
import bcrypt from "bcrypt";

const db: Database = new InMemoryDatabase();

const app = express();
app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: ["b2cc1685-6c47-4faf-8cf3-e6aed3c04e0"],
    maxAge: 48 * 60 * 60 * 1000, // 48 hours
  })
);
app.use((req, res, next) => {
  if (req.session && !req.session.started) {
    req.session.started = new Date().toISOString();
  }
  next();
});
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

function apiError(res: express.Response, message: string, status: number) {
  res.set("Content-Type", "application/json");
  res.status(status).json({
    status: "error",
    message,
  });
}

app.post("/api/login", async (req, res) => {
  try {
    console.log(req.body);
    let user = await db.getUserByEmail(req.body.email);
    if (!user) {
      console.log("login: unknown user");
      apiError(res, "Invalid credentials", 400);
      return;
    }
    let ok = await bcrypt.compare(req.body.password, user.bcrypt_password);
    if (!ok) {
      console.log("login: wrong password");
      apiError(res, "Invalid credentials", 400);
      return;
    }
    delete (user as any).bcrypt_password;
    res.json({ status: "ok", user });
  } catch (e) {
    console.error(`unknown failure occured: ${e.message}`);
    apiError(res, "Internal server error", 500);
  }
});

// GET /users — index/listing
// POST /users — create
// GET /users/{user_id} — read
// PUT /users/{user_id} — update
// DELETE /users/{user_id} — destroy

app.get("/api/users/:id", async (req, res) => {
  try {
    let user = await db.getUserByID(req.params.id);
    if (!user) {
      apiError(res, "Unknown user", 404);
      return;
    }
    // never reveal password hashes over the API
    delete (user as any).bcrypt_password;
    res.json(user);
  } catch (e) {
    console.error(`unknown failure occured: ${e.message}`);
    apiError(res, "Internal server error", 500);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.email) {
      apiError(res, "Must provide email", 400);
      return;
    }
    const email = req.body.email;
    if (!validateEmail.validate(email)) {
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

    let bcryptPassword = await bcrypt.hash(req.body.password, 10);

    let newUser = await db.createUser({
      email,
      name: req.body.name,
      bcrypt_password: bcryptPassword,
      created_at: new Date().toISOString(),
    });

    res.json(newUser);
  } catch (e) {
    console.error(`unknown failure occured: ${e.message}`);
    apiError(res, "Internal server error", 500);
  }
});
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
