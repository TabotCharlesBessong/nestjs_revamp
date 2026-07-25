import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  isMarried: boolean;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Alice',
      username: 'alice01',
      email: 'alice@example.com',
      age: 28,
      gender: 'Female',
      isMarried: false,
    },
    {
      id: 2,
      name: 'Bob',
      username: 'bob02',
      email: 'bob@example.com',
      age: 32,
      gender: 'Male',
      isMarried: true,
    },
  ];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: Omit<User, 'id'>): User {
    const newUser = { id: Date.now(), ...user };
    this.users.push(newUser);
    return newUser;
  }
}
