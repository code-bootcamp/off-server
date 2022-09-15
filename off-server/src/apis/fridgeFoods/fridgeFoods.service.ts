import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Fridge } from '../fridges/entities/fridges.entity';
import { FridgesService } from '../fridges/fridges.service';
import { FridgeFood } from './entities/fridgeFood.entity';

@Injectable()
export class FridgeFoodsService {
  constructor(
    @InjectRepository(FridgeFood)
    private readonly fridgeFoodRepository: Repository<FridgeFood>,
    private readonly fridgesService: FridgesService,
    @InjectRepository(Fridge)
    private readonly fridge: Repository<Fridge>,
  ) {}

  async findAll({ userId, page, status }) {
    const fridge = await this.fridge.findOne({
      where: { user: { id: userId } },
    });
    console.log('find', fridge);
    const result = await this.fridgeFoodRepository.find({
      where: {
        fridge: {
          id: fridge.id,
        },
        status,
      },
      order: { regDate: 'ASC' },
      // skip: (page - 1) * 5,
      // take: 5,
      relations: ['fridge', 'category'],
    });

    return result;
  }

  async findAllNull({ userId }) {
    const fridge = await this.fridge.findOne({
      where: { user: { id: userId } },
    });
    console.log('find', fridge);
    const result = await this.fridgeFoodRepository.find({
      where: {
        fridge: {
          id: fridge.id,
        },
        status: IsNull(),
      },
      order: { regDate: 'ASC' },
      relations: ['fridge', 'category'],
    });

    return result;
  }

  async createFood({ fridgeFoodInput, userId, status }) {
    // user의 냉장고 번호 찾기
    const myFridge = await this.fridgesService.findOne({ userId });
    console.log('food Create', myFridge);
    return await this.fridgeFoodRepository.save({
      fridge: myFridge.id,
      status,
      ...fridgeFoodInput,
    });
  }

  async updateFood({ updateFridgeFoodInput, userId, fridgeFoodId, status }) {
    const myFood = await this.fridgeFoodRepository.findOne({
      where: { id: fridgeFoodId },
    });

    const result = await this.fridgeFoodRepository.save({
      ...myFood,
      status,
      id: fridgeFoodId,
      ...updateFridgeFoodInput,
    });

    return result;
  }

  async deleteFood({ foodId, userId }) {
    // user의 냉장고음식인지 check
    const fridge = await this.fridgesService.findOne(userId);

    if (userId !== fridge.user.id) {
      throw new UnprocessableEntityException('권한이 없습니다.');
    }

    const result = await this.fridgeFoodRepository.softDelete({ id: foodId });
    return result.affected ? true : false;
  }
}
