import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Logger, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { PaginationDto } from 'src/common';
import { Auth, GetUser } from 'src/auth';
import { CurrentUser } from 'src/user';

@Controller('catalog')
@Auth()
export class CatalogController {
  private readonly logger = new Logger(CatalogController.name);

  constructor(
    private readonly catalogService: CatalogService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get('departments')
  getDepartments(@Query() pagination: PaginationDto, @GetUser() user: CurrentUser) {
    this.logger.log(`Fetching departments: ${JSON.stringify(pagination)}, user: ${user.id} - ${user.username}`);

    return this.getCachedResponse('catalog:departments', () => this.catalogService.getDepartments(pagination, user));
  }

  private async getCachedResponse<T>(cacheKey: string, fetchFunction: () => Promise<T>): Promise<T> {
    const cachedResponse = await this.cacheManager.get<T>(cacheKey);

    if (cachedResponse) {
      this.logger.log(`Returning cached response for ${cacheKey}`);
      return cachedResponse;
    }

    const response = await fetchFunction();
    await this.cacheManager.set(cacheKey, response, 6.048e8); // 1 week

    return response;
  }
}
