import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [AuthModule, UserModule, TicketModule, CatalogModule],
  providers: [PrismaService],
})
export class AppModule {}
