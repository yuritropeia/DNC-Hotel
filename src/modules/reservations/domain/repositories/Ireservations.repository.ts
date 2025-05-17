/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Reservation, ReservationStatus } from '@prisma/client';
import { CreateReservationDto } from '../dto/create-reservation.dto';

export interface IReservationRepository {
  create(data: CreateReservationDto): Promise<Reservation>;
  findById(id: number): Promise<Reservation | null>;
  findAll(): Promise<Reservation[]>;
  findByUser(userId: number): Promise<Reservation[]>;
  updateStatus(id: number, status: ReservationStatus): Promise<Reservation>;
}
