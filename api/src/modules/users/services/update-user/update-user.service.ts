import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { UpdateUserDto } from '../../interfaces/update-user.dto';

@Injectable()
export class UpdateUserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async run(data: UpdateUserDto): Promise<User> {
    const user = await this.model.findById(data.id);
    if (!user) throw new BadRequestException('usuário não encontrado');
    Object.assign(user, data);
    return user.save();
  }
}
