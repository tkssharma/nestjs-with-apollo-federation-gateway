import { Injectable, forwardRef, Inject, ConsoleLogger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserInput, User, LoginResult } from '../graphql.classes';
import { ConfigService } from '../config/config.service';
import { resolve } from 'path';
import { Console } from 'console';
import { UserEntity } from '../users/entity/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  /**
   * Checks if a user's password is valid
   *
   * @param {LoginUserInput} loginAttempt Include username or email. If both are provided only
   * username will be used. Password must be provided.
   * @returns {(Promise<LoginResult | undefined>)} returns the User and token if successful, undefined if not
   * @memberof AuthService
   */
  async validateUserByPassword(
    loginAttempt: LoginUserInput,
  ): Promise<LoginResult | undefined> {
    console.log(loginAttempt)

    // This will be used for the initial login
    let userToAttempt: UserEntity | undefined;
    if (loginAttempt.email) {
      userToAttempt = await this.usersService.findOneByEmail(
        loginAttempt.email,
      );

    }

    // Check the supplied password against the hash stored for this email address
    let isMatch = false;
    try {
      isMatch = await this.comparePassword(loginAttempt.password, userToAttempt.password);
    } catch (error) {
      console.log(error);
      return undefined;
    }

    if (isMatch) {
      // If there is a successful match, generate a JWT for the user
      const token = this.createJwt(userToAttempt!).token;
      const result: any = {
        user: userToAttempt!,
        token,
      };
      userToAttempt.updated_at = new Date();
      userToAttempt.save();
      return result;
    }
    return null;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  /**
   * Verifies that the JWT payload associated with a JWT is valid by making sure the user exists and is enabled
   *
   * @param {JwtPayload} payload
   * @returns {(Promise<UserDocument | undefined>)} returns undefined if there is no user or the account is not enabled
   * @memberof AuthService
   */
  async validateJwtPayload(
    payload: JwtPayload,
  ): Promise<UserEntity | undefined> {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findOneByUsername(payload.username);

    // Ensure the user exists and their account isn't disabled
    if (user) {
      user.updated_at = new Date();
      user.save();
      return user;
    }

    return undefined;
  }

  /**
   * Creates a JwtPayload for the given User
   *
   * @param {User} user
   * @returns {{ data: JwtPayload; token: string }} The data contains the email, username, and expiration of the
   * token depending on the environment variable. Expiration could be undefined if there is none set. token is the
   * token created by signing the data.
   * @memberof AuthService
   */
  createJwt(user: UserEntity): { data: JwtPayload; token: string } {
    const expiresIn = this.configService.get().auth.expireIn as number;
    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn * 1000);
    }
    const data: JwtPayload = {
      userId: user.id,
      username: user.username,
      permissions: user.permissions,
      expiration,
    };

    const jwt = this.jwtService.sign(data);

    return {
      data,
      token: jwt,
    };
  }
}
