import { Catalog } from 'src/catalog/interfaces';
import { Base } from 'src/common';

export interface TicketResponse extends Base {
  title: string;
  description: string;
  category: Catalog;
  priority: Catalog;
  status: Catalog;
  department: Catalog;
}
