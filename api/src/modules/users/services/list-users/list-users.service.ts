import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class ListUsersService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async run(data?: any): Promise<User[]> {
    return this.model.find().exec();
  }
}
