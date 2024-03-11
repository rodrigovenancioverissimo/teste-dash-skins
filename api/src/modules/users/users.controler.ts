import { Controller, Get, Post } from '@nestjs/common';
import { CreateUserService } from './services/create-user/create-user.service';
import { ListUsersService } from './services/list-users/list-users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly cUser: CreateUserService,
    private readonly lUser: ListUsersService,
  ) {}

  @Get()
  list() {
    return this.lUser.run();
  }

  @Post()
  create() {
    return this.cUser.run({});
  }
}
