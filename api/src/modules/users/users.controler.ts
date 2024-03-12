import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateUserService } from './services/create-user/create-user.service';
import { ListUsersService } from './services/list-users/list-users.service';
import { CreateUserDto } from './interfaces/create-user.dto';
import { UpdateUserService } from './services/update-user/update-user.service';
import { UpdateUserDto } from './interfaces/update-user.dto';
import { DeleteUserService } from './services/delete-user/delete-user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createService: CreateUserService,
    private readonly listService: ListUsersService,
    private readonly updateService: UpdateUserService,
    private readonly deleteService: DeleteUserService,
  ) {}

  @Get()
  list() {
    return this.listService.run();
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.createService.run(body);
  }

  @Patch()
  update(@Body() body: UpdateUserDto) {
    return this.updateService.run(body);
  }

  @Delete()
  delete(@Body('id') id: string) {
    return this.deleteService.run(id);
  }
}
