import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './users/users.entity';
import { UsersController } from './users/users.controller';
import { usersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { FilmsController } from './films/films.controller';
import { filmsService } from './films/films.service';
import { films } from './films/films.entity';
import { LoggerMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest-crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([users,films]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: 3600 },
    })
  ],
  controllers: [UsersController,FilmsController],
  providers: [usersService,filmsService],
})
export class AppModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(FilmsController);
      
  }
}
