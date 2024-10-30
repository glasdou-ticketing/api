import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common';

import { ExceptionHandler } from 'src/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/user';

@Injectable()
export class CatalogService {
  private readonly logger = new Logger(CatalogService.name);
  private readonly exHandler = new ExceptionHandler(this.logger, CatalogService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getDepartments(pagination: PaginationDto, user: CurrentUser) {
    this.logger.log(`Fetching departments: ${JSON.stringify(pagination)}, user: ${user.id} - ${user.username}`);
    const { page, limit } = pagination;

    const [data, total] = await Promise.all([
      this.prisma.department.findMany({
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.prisma.department.count({}),
    ]);

    const lastPage = Math.ceil(total / limit);

    return { meta: { total, page, lastPage }, data };
  }
}
