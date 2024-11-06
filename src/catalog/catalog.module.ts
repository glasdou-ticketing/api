import { Module } from '@nestjs/common';
import { AuthModule, AuthService } from 'src/auth';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisModule } from 'src/redis/redis.module';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService, AuthService],
  imports: [PrismaModule, RedisModule, AuthModule],
})
export class CatalogModule {}
