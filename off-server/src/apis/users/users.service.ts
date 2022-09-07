import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import coolsms from 'coolsms-node-sdk';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) //
    private readonly cacheManager: Cache,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne({ email }) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserId(userId){
    return await this.userRepository.findOne({where: {id: userId}})
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

  async checkPhone(phone: string) {
    const phoneForm = /^010-?([0-9]{4})-?([0-9]{4})$/.test(phone);
    const findPhone = await this.userRepository.findOne({
      where: { phone: phone },
    });

    if (!phoneForm) {
      throw new ConflictException('핸드폰 번호가 올바르지 않습니다.');
    }

    if (findPhone) {
      throw new ConflictException('이미 가입된 핸드폰 번호입니다.');
    }
  }

  async sendTokenToSMS({ phone }) {
    const token = String(Math.floor(Math.random() * 10 ** 6)).padStart(6, '0');
    await this.cacheManager.set(phone, token, { ttl: 180 });
    const SMS_KEY = process.env.SMS_KEY;
    const SMS_SECRET = process.env.SMS_SECRET;

    const messageService = new coolsms(SMS_KEY, SMS_SECRET);
    await messageService.sendOne({
      to: phone,
      from: process.env.SMS_SENDER,
      text: `인증번호는 ${token} 입니다.`,
      autoTypeDetect: true,
    });
    return '인증번호를 전송했습니다.';
  }

  async tokenCheck({ phone, token }) {
    const myToken = await this.cacheManager.get(phone);
    if (myToken === token) {
      return true;
    } else {
      return false;
    }
  }

  async update({ hashePassword: password, email, updateUserInput }) {
    const myuser = await this.userRepository.findOne({
      where: { email: email },
    });
    const result = this.userRepository.save({
      ...myuser,
      email: email,
      ...updateUserInput,
      password,
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
