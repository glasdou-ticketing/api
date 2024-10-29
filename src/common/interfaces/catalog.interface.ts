export interface Catalog {
  id: string;
  name: string;
}

export enum Departments {
  HumanResources = 1,
  Engineering = 2,
  Marketing = 3,
  Sales = 4,
  CustomerSupport = 5,
}

export enum TicketCategories {
  Bug = 1,
  FeatureRequest = 2,
  Question = 3,
  Complaint = 4,
  Other = 5,
}

export enum TicketPriorities {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4,
}

export enum TicketStatuses {
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
}
