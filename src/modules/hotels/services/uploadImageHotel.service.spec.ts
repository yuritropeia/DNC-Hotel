import { Test, TestingModule } from '@nestjs/testing';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';
import { UploadImageHotelService } from './uploadImageHotel.service';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import { NotFoundException } from '@nestjs/common';
import { stat, unlink } from 'fs/promises';
import { join, resolve } from 'path';
import { REDIS_HOTEL_KEY } from '../utils/redisKey';

let service: UploadImageHotelService;
let hotelRepository: IHotelRepository;
let redis: { del: jest.Mock };

const hotelMock = {
  id: 1,
  name: 'Test Hotel',
  description: 'A test hotel description',
  image: 'test-image.jpg',
  price: 100,
  address: '123 Test St',
  ownerId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

jest.mock('fs/promises', () => ({
  stat: jest.fn(),
  unlink: jest.fn(),
}));

describe('UploadImageHotelService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadImageHotelService,
        {
          provide: REPOSITORY_TOKEN_HOTEL,
          useValue: {
            findHotelById: jest.fn().mockResolvedValue(hotelMock),
            updateHotel: jest.fn().mockResolvedValue(hotelMock),
          },
        },
        {
          provide: 'default_IORedisModuleConnectionToken',
          useValue: {
            del: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UploadImageHotelService>(UploadImageHotelService);
    hotelRepository = module.get<IHotelRepository>(REPOSITORY_TOKEN_HOTEL);
    redis = module.get('default_IORedisModuleConnectionToken');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException if hotel does not exist', async () => {
    (hotelRepository.findHotelById as jest.Mock).mockResolvedValue(null);

    const result = service.execute('1', 'image.jpg');

    await expect(result).rejects.toThrow(NotFoundException);
  });

  it('should delete existing image if it exists', async () => {
    (stat as jest.Mock).mockResolvedValue(true);

    await service.execute('1', 'image.jpg');

    const directory = resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'uploads-hotel',
    );

    const imageHotelFilePath = join(directory, hotelMock.image);

    expect(stat).toHaveBeenCalledWith(imageHotelFilePath);
    expect(unlink).toHaveBeenCalledWith(imageHotelFilePath);
  });

  it('should not throw if existing image does not exist', async () => {
    (stat as jest.Mock).mockResolvedValue(null);

    await expect(service.execute('1', 'new-image.jpg')).resolves.not.toThrow();
  });

  it('should update the hotel with the new image', async () => {
    (stat as jest.Mock).mockResolvedValue(true);

    await service.execute('1', 'new-image.jpg');

    expect(hotelRepository.updateHotel).toHaveBeenCalledWith(1, {
      image: 'new-image.jpg',
    });
  });

  it('should delete the Redis cache key', async () => {
    await service.execute('1', 'new-image.jpg');
    expect(redis.del).toHaveBeenCalledWith(REDIS_HOTEL_KEY);
  });
});
