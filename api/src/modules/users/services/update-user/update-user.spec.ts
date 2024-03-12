import { getModelToken } from '@nestjs/mongoose';
import { UpdateUserService } from './update-user.service';
import { BadRequestException } from '@nestjs/common';
import { User } from '../../schemas/user.schema';
import { UpdateUserDto } from '../../interfaces/update-user.dto';
import { TestBed } from '@automock/jest';

describe('UpdateUserService', () => {
  let service: UpdateUserService;
  let modelMock: any;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UpdateUserService)
      .mock(getModelToken(User.name))
      .using({
        findById: jest.fn(),
      })
      .compile();

    service = unit;
    modelMock = unitRef.get(getModelToken(User.name));
  });

  it('should update a user', async () => {
    const userData: UpdateUserDto = {
      id: 'userId',
    } as UpdateUserDto;

    const userMock = {
      save: jest.fn().mockResolvedValue(userData),
    };

    modelMock.findById.mockResolvedValue(userMock);

    const result = await service.run(userData);

    expect(result).toEqual(userData);
    expect(modelMock.findById).toHaveBeenCalledWith(userData.id);
    expect(userMock.save).toHaveBeenCalled();
  });

  it('should throw BadRequestException when user is not found', async () => {
    const userData: UpdateUserDto = {
      id: 'userId',
    } as UpdateUserDto;

    modelMock.findById.mockResolvedValue(null);

    await expect(service.run(userData)).rejects.toThrow(BadRequestException);
    expect(modelMock.findById).toHaveBeenCalledWith(userData.id);
  });
});
