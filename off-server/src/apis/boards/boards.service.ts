import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.boardRepository.find({
      relations: ['category', 'user'],
    });
  }

  async findOne({ id }) {
    return await this.boardRepository.findOne({
      where: { id: id },
      relations: ['category', 'user'],
    });
  }

  async create({ createBoardInput, userId }) {
    const { categoryId, ...rest } = createBoardInput;

    const result = await this.boardRepository.save({
      user: userId,
      ...rest,
      category: categoryId,
    });
    return result;
  }

  async update({ updateBoardInput, userId, boardId }) {
    const myboard = await this.boardRepository.findOne({
      where: { id: userId },
    });
    const result = this.boardRepository.save({
      ...myboard,
      id: boardId,
      ...updateBoardInput,
    });
    return result;
  }

  async delete({ id, userId }) {
    const myboard = await this.boardRepository.findOne(userId);
    const result = await this.boardRepository.softDelete({
      id: id,
    });
    return result;
  }
}
