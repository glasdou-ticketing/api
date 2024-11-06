import { Module } from '@nestjs/common';
import { AuthModule, AuthService } from 'src/auth';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisModule } from 'src/redis/redis.module';
import { TicketCatalogController } from './ticket-catalog.controller';
import { TicketCatalogService } from './ticket-catalog.service';

@Module({
  controllers: [TicketCatalogController],
  providers: [TicketCatalogService, AuthService],
  imports: [PrismaModule, RedisModule, AuthModule],
})
export class TicketCatalogModule {}
