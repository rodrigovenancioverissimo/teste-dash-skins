import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { CreateUserDto } from '../../interfaces/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async run(data: CreateUserDto): Promise<User> {
    const user = await this.model.findOne({ email: data.email });
    if (user) throw new BadRequestException('email já utilizado');
    return this.model.create(data);
  }
}
