import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { PaginationDto } from 'src/common';
import { Auth } from 'src/auth';

@Controller('catalog')
@Auth()
export class CatalogController {
  constructor(
    private readonly catalogService: CatalogService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get('departments')
  getDepartments(@Query() pagination: PaginationDto) {
    return this.getCachedResponse('catalog:departments', () => this.catalogService.getDepartments(pagination));
  }

  private async getCachedResponse<T>(cacheKey: string, fetchFunction: () => Promise<T>): Promise<T> {
    const cachedResponse = await this.cacheManager.get<T>(cacheKey);

    if (cachedResponse) return cachedResponse;

    const response = await fetchFunction();
    await this.cacheManager.set(cacheKey, response, 6.048e8);

    return response;
  }
}
