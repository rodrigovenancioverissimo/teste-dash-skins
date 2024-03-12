import { TestBed } from '@automock/jest';
import { BadRequestException } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { User } from '../../schemas/user.schema';
import { CreateUserDto } from '../../interfaces/create-user.dto';
import { getModelToken } from '@nestjs/mongoose';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let userModel: any;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CreateUserService)
      .mock(getModelToken(User.name))
      .using({
        findOne: jest.fn(),
        crate: jest.fn(),
      })
      .compile();
    service = unit;
    userModel = unitRef.get(getModelToken(User.name));
  });
  it('should create a user', async () => {
    const userData = {
      email: 'test@example.com',
    } as CreateUserDto;

    userModel.create.mockReturnValue({
      ...userData,
      _id: 'generatedId',
    });

    const result = await service.run(userData);
    expect(result).toEqual({
      ...userData,
      _id: 'generatedId',
    });
    expect(userModel.create).toHaveBeenCalledWith(userData);
  });

  it('should throw BadRequestException when email is already used', async () => {
    const userData = {
      email: 'test@example.com',
    } as CreateUserDto;

    userModel.findOne.mockResolvedValue([{ email: userData.email }]);

    await expect(service.run(userData)).rejects.toThrow(BadRequestException);
  });
});
