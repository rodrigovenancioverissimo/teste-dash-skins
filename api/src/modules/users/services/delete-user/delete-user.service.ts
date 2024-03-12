import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class DeleteUserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async run(id: string): Promise<User> {
    return this.model.findByIdAndDelete(id);
  }
}
