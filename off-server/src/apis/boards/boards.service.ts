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

  async create({ createBoardInput, email }) {
    const findUser = await this.userRepository.findOne({
      where: { email: email },
    });
    const result = await this.boardRepository.save({
      user: findUser.email,
      ...createBoardInput,
    });
    return result;
  }
}
