import { MinLength } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
class GetAuthorArgs {
  @Field({ nullable: true })
  public firstName?: string;

  @Field({ defaultValue: '' })
  @MinLength(3)
  public lastName!: string;
}