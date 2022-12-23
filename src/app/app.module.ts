import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { UsersModule } from '../users/users.module';
import { ReportsModule } from '../reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Report } from '../reports/entities/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentUserInterceptor } from '../users/interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'sqlite',
          database: configService.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true,
        };
      },
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
