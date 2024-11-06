export interface Catalog {
  id: string;
  name: string;
}

export enum Department {
  HumanResources = 1,
  Engineering = 2,
  Marketing = 3,
  Sales = 4,
  CustomerSupport = 5,
}

export enum TicketCategory {
  Bug = 1,
  FeatureRequest = 2,
  Question = 3,
  Complaint = 4,
  Other = 5,
}

export enum TicketPriority {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4,
}

export enum TicketStatus {
  Open = 1,
  InProgress = 2,
  Resolved = 3,
  Closed = 4,
  Reopened = 5,
}

export enum TicketLogType {
  Comment = 1,
  StatusChange = 2,
  PriorityChange = 3,
  CategoryChange = 4,
  AssigneeChange = 5,
  Attachment = 6,
  Created = 7,
  Updated = 8,
  Deleted = 9,
  Restored = 10,
}
