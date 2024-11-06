import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { PrismaModule } from './prisma/prisma.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, TicketModule, CatalogModule, PrismaModule],
})
export class AppModule {}
