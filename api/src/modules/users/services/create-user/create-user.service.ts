import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class CreateUserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async run(data: any): Promise<User> {
    const created = new this.model(data);
    return created.save();
  }
}
