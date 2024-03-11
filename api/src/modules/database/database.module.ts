import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig, { databaseConfigValidation } from './database.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [databaseConfig],
      validationSchema: databaseConfigValidation,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { uri } =
          configService.get<ReturnType<typeof databaseConfig>>('database');
        console.log(uri);
        return { uri };
      },
    }),
  ],
})
export class DatabaseModule {}
