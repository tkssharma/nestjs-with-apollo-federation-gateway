import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
  ) { }

  /**
   * Verifies that the JWT payload associated with a JWT is valid by making sure the user exists and is enabled
   *
   * @param {JwtPayload} payload
   * @returns {(Promise<UserDocument | undefined>)} returns undefined if there is no user or the account is not enabled
   * @memberof AuthService
   */
  async validateJwtPayload(
    payload: JwtPayload,
  ): Promise<any | undefined> {
    // This will be used when the user has already logged in and has a JWT
    // ? how should we make sure that user is valid from another service
    return payload;
  }
}
