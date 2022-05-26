import { IsDefined, isDefined, IsEmail, IsString, MinLength } from "class-validator"

export class UserSignup {
  @IsDefined()
  @IsString()
  @IsEmail()
  public email!: string;


  @IsDefined()
  @MinLength(6)
  @IsString()
  public username!: string;

  @IsDefined()
  @MinLength(6)
  @IsString()
  public password!: string;
}