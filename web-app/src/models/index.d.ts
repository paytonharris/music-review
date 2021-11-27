import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ReviewMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Review {
  readonly id: string;
  readonly date: string;
  readonly userID: string;
  readonly reviewerName?: string;
  readonly title?: string;
  readonly body?: string;
  readonly rating?: number;
  readonly albumName?: string;
  readonly artistName?: string;
  readonly albumID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Review, ReviewMetaData>);
  static copyOf(source: Review, mutator: (draft: MutableModel<Review, ReviewMetaData>) => MutableModel<Review, ReviewMetaData> | void): Review;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly userID: string;
  readonly pic?: string;
  readonly bio?: string;
  readonly nickname?: string;
  readonly preferredUsername?: string;
  readonly joinDate?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}