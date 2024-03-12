import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserService } from './services/create-user/create-user.service';
import { ListUsersService } from './services/list-users/list-users.service';
import { CreateUserDto } from './interfaces/create-user.dto';

@Controller('users')
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
  create(@Body() body: CreateUserDto) {
    return this.cUser.run(body);
  }
}
