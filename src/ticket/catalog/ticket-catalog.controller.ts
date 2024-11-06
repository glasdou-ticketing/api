import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { TicketCatalogService } from './ticket-catalog.service';
import { Auth } from 'src/auth';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller('ticket/catalog')
@Auth()
export class TicketCatalogController {
  private readonly logger = new Logger(TicketCatalogController.name);

  constructor(
    private readonly catalogService: TicketCatalogService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get('categories')
  async getCategories() {
    return this.getCachedResponse('ticket:categories', () => this.catalogService.getCategories());
  }

  @Get('statuses')
  async getStatuses() {
    return this.getCachedResponse('ticket:statuses', () => this.catalogService.getStatuses());
  }

  @Get('priorities')
  async getPriorities() {
    return this.getCachedResponse('ticket:priorities', () => this.catalogService.getPriorities());
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
