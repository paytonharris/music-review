import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ReviewMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Review {
  readonly id: string;
  readonly date: number;
  readonly userID: string;
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