import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateUserService } from './services/create-user/create-user.service';
import { ListUsersService } from './services/list-users/list-users.service';
import { CreateUserDto } from './interfaces/create-user.dto';
import { UpdateUserService } from './services/update-user/update-user.service';
import { UpdateUserDto } from './interfaces/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly cUser: CreateUserService,
    private readonly lUser: ListUsersService,
    private readonly uUser: UpdateUserService,
  ) {}

  @Get()
  list() {
    return this.lUser.run();
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.cUser.run(body);
  }

  @Patch()
  update(@Body() body: UpdateUserDto) {
    return this.uUser.run(body);
  }
}
