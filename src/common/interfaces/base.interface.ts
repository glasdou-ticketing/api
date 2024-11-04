import { UserSummary } from 'src/user';

export interface Base {
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  createdBy: UserSummary | null;
  updatedBy?: UserSummary | null;
  deletedBy?: UserSummary | null;
}
