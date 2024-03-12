import { Module } from '@nestjs/common';
import { UsersController } from './users.controler';
import { CreateUserService } from './services/create-user/create-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { ListUsersService } from './services/list-users/list-users.service';
import { UpdateUserService } from './services/update-user/update-user.service';
import { DeleteUserService } from './services/delete-user/delete-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    CreateUserService,
    ListUsersService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UsersModule {}
