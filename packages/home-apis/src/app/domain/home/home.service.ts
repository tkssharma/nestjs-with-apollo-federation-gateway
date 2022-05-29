import { Logger } from '@logger/logger';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Home } from '../entity/home.entity';
import { CreateHomeDto } from './home.dto';


@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home) private readonly homeRepository: Repository<Home>,
    private readonly logger: Logger
  ) {
  }

  async createHome(data: any, userid: string): Promise<Home> {
    const body = data.payload;
    try {
      const existingHome = await this.homeRepository.findOne({ where: { name: body.name } })
      if (existingHome) {
        return existingHome;
      }
      const res = await this.homeRepository
        .save({ ...body, user_id: userid });
      return res;
    } catch (err: any) {
      this.logger.error(err);
      throw err;
    }
  }


  async updateHome(id: string, data: any): Promise<Home> {
    const body = data.payload;
    const homeHome = await this.homeRepository.findOne({ where: { id } });
    const updatedHome = { ...homeHome, ...body }
    return await this.homeRepository.save(updatedHome)
  }

  async listAll() {
    return await this.homeRepository.find({ relations: ['locality', 'facilities'] });
  }

  async findHome(name: string) {
    return await this.homeRepository.find({ where: { name: ILike(`%${name}%`) }, relations: ['locality', 'facilities'] });
  }

  async listAllActiveHomes() {
    return await this.homeRepository.find({ where: { is_active: true }, relations: ['locality', 'facilities'] });
  }

  async getById(id: string) {
    return await this.homeRepository.findOne({ where: { id, is_active: true }, relations: ['locality', 'facilities'] });
  }

  async getByHomeName(name: string) {
    return await this.homeRepository.findOne({ where: { name } });
  }

  async getByHomeId(id: string) {
    return await this.homeRepository.findOne({ where: { id } });
  }
}
