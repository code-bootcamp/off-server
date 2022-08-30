import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne({ id }) {
    return await this.userRepository.findOne({ where: { email: id } });
  }

  async create({ hashePassword: password, ...createUserInput }) {
    console.log(password, createUserInput);
    const user = await this.userRepository.findOne({
      where: { email: createUserInput.email },
    });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    return await this.userRepository.save({ ...createUserInput, password });
  }
}
