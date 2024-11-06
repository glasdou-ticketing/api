import { Module } from '@nestjs/common';
import { AuthModule, AuthService } from 'src/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisModule } from 'src/redis/redis.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService],
  imports: [PrismaModule, RedisModule, AuthModule],
})
export class UserModule {}
