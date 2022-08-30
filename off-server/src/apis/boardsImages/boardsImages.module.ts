import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { BoardsImage } from './entities/boardsImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardsImage, Board])],
})
export class BoardsImagesModule {}
