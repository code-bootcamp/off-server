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

  async findOne({ email }) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findUsersWithDeleted() {
    return await this.userRepository.find({
      withDeleted: true,
    });
  }

  async create({ hashePassword: password, ...createUserInput }) {
    console.log(password, createUserInput);
    const user = await this.userRepository.findOne({
      where: { email: createUserInput.email },
    });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    return await this.userRepository.save({ ...createUserInput, password });
  }

  async update({ email, updateUserInput }) {
    const myuser = await this.userRepository.findOne({
      where: { email: email },
    });
    const result = this.userRepository.save({
      ...myuser,
      email: email,
      ...updateUserInput,
    });
    return result;
  }
  async delete({ email }) {
    const result = await this.userRepository.softDelete({
      email: email,
    }); // 다른 것으로도 삭제 가능
    return result.affected ? true : false;
  }

  async restore({ email }) {
    const result = await this.userRepository.restore({
      email: email,
    });
    return result.affected ? true : false;
  }
}
