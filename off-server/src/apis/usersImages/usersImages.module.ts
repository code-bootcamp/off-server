import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersImage } from './entities/usersImage.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UsersImage, User])],
})
export class UsersImagesModule {}
