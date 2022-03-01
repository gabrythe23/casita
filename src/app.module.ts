import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { LightsModule } from './lights/lights.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    LightsModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'homebridge.local',
      port: 3306,
      username: 'root',
      password: 'saluzzo',
      database: 'casita',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
