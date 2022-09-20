import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BoardsImage } from '../boardsImages/entities/boardsImage.entity';
import { SalesLocations } from '../salesLocations/entities/salesLocation.entity';
import { Board, Board_STATUS_ENUM } from './entities/board.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Cache } from 'cache-manager';
import { OrderHistory } from '../orderHistory/entities/orderHistory.entity';
import { OrderHistoryService } from '../orderHistory/orderHistory.service';
import { SalesHistoryService } from '../salesHistory/salesHistory.service';
import { url } from 'inspector';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(SalesLocations)
    private readonly salesLocationRepository: Repository<SalesLocations>,
    @InjectRepository(BoardsImage)
    private readonly boardsImageRepository: Repository<BoardsImage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly orderHistoryService: OrderHistoryService,
    private readonly salesHistoryService: SalesHistoryService,
    private readonly connection: DataSource,
  ) {}

  async elasticsearchTitle({ title }) {
    const mycache = await this.cacheManager.get(title);
    if (mycache) {
      return mycache;
    }
    const data = await this.elasticsearchService.search({
      index: 'off',
      query: {
        match: {
          title: title,
        },
      },
    });
    // const result = data.hits.hits.map((ele) => ele._source);
    await this.cacheManager.set(title, data), { ttl: 60 };
    // result[0]['expdate'] = new Date(result[0]['expdate']);
    return data;
  }
  async elasticsearchCategory({ category }) {
    const mycache = await this.cacheManager.get(category);
    if (mycache) {
      console.log('mycache', mycache);
      return mycache;
    }
    const data = await this.elasticsearchService.search({
      index: 'off',
      query: {
        match: { categoryname: category },
      },
    });
    // console.log('data!!!!!!!!!!!!!!!!!!', data);
    const result = data.hits.hits.map((ele) => ele._source);
    console.log(result);
    await this.cacheManager.set(category, data), { ttl: 60 };
    // result[0]['expdate'] = new Date(result[0]['expdate']);
    return data;
  }

  async elasticsearchLocation({ location }) {
    const mycache = await this.cacheManager.get(location);
    if (mycache) {
      return mycache;
    }
    const data = await this.elasticsearchService.search({
      index: 'off',
      query: {
        multi_match: {
          query: location,
          type: 'cross_fields',
          fields: ['address', 'detail'],
        },
      },
    });
    // const result = data.hits.hits.map((ele) => ele._source);
    await this.cacheManager.set(location, data), { ttl: 60 };
    // result[0]['expdate'] = new Date(result[0]['expdate']);
    return data;
  }

  async findAll() {
    return await this.boardRepository.find({
      relations: ['category', 'user', 'salesLocation', 'boardImage'],
    });
  }

  async findOne({ id }) {
    const board = await this.boardRepository.findOne({
      // board
      where: { id: id },
      relations: ['category', 'user', 'salesLocation', 'boardImage'],
    });
    const user = await this.userRepository.findOne({
      //user
      where: { id: board.user.id },
      relations: ['usersimage'],
    });
    board.user.usersimage = user.usersimage;
    return board;
  }

  async create({ createBoardInput, userId }) {
    const { url, categoryId, salesLocations, ...rest } = createBoardInput;

    const result = await this.salesLocationRepository.save({
      ...salesLocations,
      status: Board_STATUS_ENUM.SALE,
    });

    const saveBoard = await this.boardRepository.save({
      ...rest,
      user: userId,
      salesLocation: result,
      category: categoryId,
    });

    for (let i = 0; i < url.length; i++) {
      const urls = url[i];
      await this.boardsImageRepository.save({
        url: urls,
        board: saveBoard.id,
      });
    }
    return saveBoard;
  }

  async createReserve({ boardId, userId, buyer }) {
    try {
      const myBoard = await this.boardRepository.findOne({
        where: { id: boardId },
        relations: ['user'],
      });

      if (userId !== myBoard.user.id) {
        await this.orderHistoryService.create({ userId, boardId });
        await this.salesHistoryService.create({
          userId: myBoard.user.id,
          boardId,
        });
      } else {
        await this.orderHistoryService.create({ userId: buyer, boardId });
        await this.salesHistoryService.create({ userId, boardId });
      }

      await this.boardRepository.save({
        ...myBoard,
        status: Board_STATUS_ENUM.RESERVATION,
      });

      return true;
    } catch (error) {
      console.log('error!!!', error);
      return false;
    }
  }

  async update({ updateBoardInput, userId, boardId, status }) {
    const myboard = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['user'],
    });
    if (userId !== myboard.user.id) {
      throw new UnprocessableEntityException('권한이 없습니다.');
    }

    let result;
    if (!updateBoardInput) {
      result = this.boardRepository.save({
        ...myboard,
        id: boardId,
        status,
      });
    }
    result = this.boardRepository.save({
      ...myboard,
      id: boardId,
      ...updateBoardInput,
      status,
    });
    return result;
  }

  async delete({ boardId, userId }) {
    const myboard = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['user'],
    });
    if (userId !== myboard.user.id) {
      throw new UnprocessableEntityException('권한이 없습니다.');
    }
    const result = await this.boardRepository.softDelete({ id: boardId });
    return result.affected ? true : false;
  }

  async deleteReserve({ boardId }) {
    // const orderId = await this.orderHistoryService.find({boardId})
    const order = await this.orderHistoryService.delete({ boardId });
    const sales = await this.salesHistoryService.delete({ boardId });

    await this.boardRepository.save({
      id: boardId,
      status: Board_STATUS_ENUM.SALE,
    });

    return order.affected && sales.affected ? true : false;
  }
}
