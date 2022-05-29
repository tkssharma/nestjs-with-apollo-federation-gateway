import { AdminGuard } from '@app/auth/guards/admin.guard';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Logger } from '@logger/logger';
import { ConsoleLogger, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Parent, ResolveField, Context, ResolveReference } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Home } from '../entity/home.entity';
import { HomeService } from './home.service';

@Resolver((of: any) => Home)
export class HomeResolver {
  constructor(private homeService: HomeService,
    private readonly logger: Logger) {
  }

  @Query()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async homes() {
    return await this.homeService.listAll();
  }

  @Query()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async findHomes(@Args('name') name: string) {
    return await this.homeService.findHome(name);
  }

  @Query()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async activeHomes() {
    return await this.homeService.listAllActiveHomes();
  }

  /*
  ! we are stuck here no solution available 
curl http://localhost:5002/graphql \
  -F operations='{ "query": "mutation ($file: Upload!) { uploadHomePhoto(file: $file) { count } }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@mocha.png

  {"correlationId":"da2434d3-8690-448e-8548-3117c860bb61","level":"error","message":"[Fri May 27 13:30:52 2022] [error] Missing multipart field ‘operations’ (https://github.com/jaydenseric/graphql-multipart-request-spec)."}
  */
  @Mutation()
  async uploadHomePhoto(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<{ id: number }> {
    try {
      console.log(file)
      const { createReadStream } = file;
      const stream = createReadStream();
      const chunks: any = [];
      console.log(stream)

      const buffer = await new Promise<Buffer>((resolve, reject) => {
        let buffer: Buffer;

        stream.on('data', function (chunk) {
          chunks.push(chunk);
        });

        stream.on('end', function () {
          buffer = Buffer.concat(chunks);
          resolve(buffer);
        });

        stream.on('error', reject);
      });
      console.log(buffer);
      const base64 = buffer.toString('base64');
      // If you want to store the file, this is one way of doing
      // it, as you have the file in-memory as Buffer

      return { id: base64.length }
    } catch (err) {
      console.log(err);
      return { id: 0 };
    }
  }

  @Query()
  async home(@Args('id') id: string) {
    return await this.homeService.getById(id);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async createHome(@Args() args: any, @Context() context: any) {
    const { userid } = context.req.headers;
    return await this.homeService.createHome(args, userid);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateHome(@Args('id') id: string, @Args() args: any) {
    return await this.homeService.updateHome(id, args);
  }

  @ResolveField('user')
  user(@Parent() home: Home) {
    this.logger.http("ResolveField::user::HomeResolver" + home.user_id)
    return { __typename: 'User', id: home.user_id };
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    this.logger.http('Logging :: ResolveReference :: home')
    return await this.homeService.getByHomeId(reference.id);
  }

}
