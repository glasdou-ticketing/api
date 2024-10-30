import { Module } from '@nestjs/common';
import { AuthModule, AuthService } from 'src/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisModule } from 'src/redis/redis.module';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService, PrismaService, AuthService],
  imports: [RedisModule, AuthModule],
})
export class CatalogModule {}
