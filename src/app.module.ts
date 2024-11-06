import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { PrismaModule } from './prisma/prisma.module';
import { TicketCatalogModule } from './ticket/catalog/ticket-catalog.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, CatalogModule, TicketModule, TicketCatalogModule],
})
export class AppModule {}
