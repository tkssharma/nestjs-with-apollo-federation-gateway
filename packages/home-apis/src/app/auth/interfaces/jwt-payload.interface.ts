export interface JwtPayload {
  userId: string;
  username: string;
  permissions: string[]
  expiration?: Date;
}
