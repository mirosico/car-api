import { UsersService } from './users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt } from 'crypto';
import {promisify } from

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException(`${email} in use`);
    }
  }

  signin() {}
}
