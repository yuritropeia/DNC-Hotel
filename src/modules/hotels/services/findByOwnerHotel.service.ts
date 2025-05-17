/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';

@Injectable()
export class FindByOwnerHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepository,
  ) {}
  async execute(id: number) {
    const hotels = await this.hotelRepositories.findHotelByOwner(id);
    const newHotels = hotels.map((hotel) => {
      if (hotel.image) {
        hotel.image = `${process.env.APP_API_URL}/hotel-image/${hotel.image}`;
      }
      return hotel;
    });

    return newHotels;
  }
}
