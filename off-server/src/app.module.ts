import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from './apis/auths/auths.module';
import { BoardsModule } from './apis/boards/boards.module';
import { CategoryModule } from './apis/category/category.module';
import { ChatingModule } from './apis/chating/chating.module';
import { FridgeCardLocationsModule } from './apis/fridgeCardLocations/fridgeCardLocations.module';
import { FridgeFoodsModule } from './apis/fridgeFoods/fridgeFoods.module';
import { FridgesModule } from './apis/fridges/fridges.module';
import { OrderHistoryModule } from './apis/orderHistory/orderHistory.module';
import { SalesHistoryModule } from './apis/salesHistory/salesHistory.module';
import { UsersModule } from './apis/users/users.module';
import { UsersImagesModule } from './apis/usersImages/usersImages.module';
import { FilesModule } from './apis/file/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthsModule,
    BoardsModule,
    FilesModule,
    CategoryModule,
    ChatingModule,
    FridgeCardLocationsModule,
    FridgeFoodsModule,
    FridgesModule,
    OrderHistoryModule,
    SalesHistoryModule,
    UsersModule,
    UsersImagesModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
      retryAttempts: 30,
    }),
  ],
})
export class AppModule {}
