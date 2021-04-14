export interface Database {
  getUserByID(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  // updateUser(user: User): Promise<User>;
  // deleteUser(user: User): Promise<void>;
}

export type User = {
  id?: string;
  email: string;
  name: string;
  bcrypt_password: string;
  created_at: string;
};

export class InMemoryDatabase implements Database {
  private users: User[];
  constructor() {
    this.users = [
      {
        id: "2b166ddcee3f407eb82612236c9ea977",
        email: "amanda@depaula.xyz",
        name: "Amanda De Paula",
        bcrypt_password:
          "$2a$10$abKmvVVFG6XMOH2jM7yeb.x6M9rA2j7WV69BWTmXRlPGFtO6L7JL2",
        created_at: "2021-04-10T17:34:11+00:00",
      },
    ];
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (let u of this.users) {
      if (u.email === email) {
        return { ...u };
      }
    }
    return null;
  }

  async getUserByID(id: string): Promise<User | null> {
    for (let u of this.users) {
      if (u.id === id) {
        return { ...u };
      }
    }
    return null;
  }

  private makeid(length: number): string {
    var result = [];
    var characters = "abcdef0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  }

  async createUser(user: User): Promise<User> {
    if (await this.getUserByEmail(user.email)) {
      throw new Error("duplicate email");
    }
    user.id = this.makeid(32);
    this.users.push(user);
    return user;
  }
}
