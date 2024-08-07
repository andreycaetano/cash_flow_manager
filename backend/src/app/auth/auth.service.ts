import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserToken } from './interfaces/userToken.interface';
import { UserPayload } from './interfaces/userPayload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async login (user: User): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    };

    async validateUser ( email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined
                };
            };
        };

        throw new UnauthorizedException(
            'Email address or password provided is incorrect.',
        );
    };

    googleLogin(req) {
        if (!req.user) {
          return 'No user from google';
        }
    
        const payload = {
          email: req.user.email,
          sub: req.user.id,
        };
    
        return {
          message: 'User information from google',
          user: req.user,
          accessToken: this.jwtService.sign(payload),
        };
      }
};
