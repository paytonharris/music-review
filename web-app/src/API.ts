/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateReviewInput = {
  id?: string | null,
  date: string,
  userID: string,
  reviewerName?: string | null,
  title?: string | null,
  body?: string | null,
  rating?: number | null,
  albumName?: string | null,
  artistName?: string | null,
  albumID?: string | null,
  _version?: number | null,
};

export type ModelReviewConditionInput = {
  date?: ModelStringInput | null,
  userID?: ModelStringInput | null,
  reviewerName?: ModelStringInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  albumName?: ModelStringInput | null,
  artistName?: ModelStringInput | null,
  albumID?: ModelStringInput | null,
  and?: Array< ModelReviewConditionInput | null > | null,
  or?: Array< ModelReviewConditionInput | null > | null,
  not?: ModelReviewConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Review = {
  __typename: "Review",
  id: string,
  date: string,
  userID: string,
  reviewerName?: string | null,
  title?: string | null,
  body?: string | null,
  rating?: number | null,
  albumName?: string | null,
  artistName?: string | null,
  albumID?: string | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateReviewInput = {
  id: string,
  date?: string | null,
  userID?: string | null,
  reviewerName?: string | null,
  title?: string | null,
  body?: string | null,
  rating?: number | null,
  albumName?: string | null,
  artistName?: string | null,
  albumID?: string | null,
  _version?: number | null,
};

export type DeleteReviewInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  userID: string,
  pic?: string | null,
  bio?: string | null,
  nickname?: string | null,
  preferredUsername?: string | null,
  joinDate?: string | null,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  userID?: ModelStringInput | null,
  pic?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  nickname?: ModelStringInput | null,
  preferredUsername?: ModelStringInput | null,
  joinDate?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  userID: string,
  pic?: string | null,
  bio?: string | null,
  nickname?: string | null,
  preferredUsername?: string | null,
  joinDate?: string | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  userID?: string | null,
  pic?: string | null,
  bio?: string | null,
  nickname?: string | null,
  preferredUsername?: string | null,
  joinDate?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type ModelReviewFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  userID?: ModelStringInput | null,
  reviewerName?: ModelStringInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  albumName?: ModelStringInput | null,
  artistName?: ModelStringInput | null,
  albumID?: ModelStringInput | null,
  and?: Array< ModelReviewFilterInput | null > | null,
  or?: Array< ModelReviewFilterInput | null > | null,
  not?: ModelReviewFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelReviewConnection = {
  __typename: "ModelReviewConnection",
  items:  Array<Review >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type SearchableReviewFilterInput = {
  id?: SearchableIDFilterInput | null,
  date?: SearchableStringFilterInput | null,
  userID?: SearchableStringFilterInput | null,
  reviewerName?: SearchableStringFilterInput | null,
  title?: SearchableStringFilterInput | null,
  body?: SearchableStringFilterInput | null,
  rating?: SearchableIntFilterInput | null,
  albumName?: SearchableStringFilterInput | null,
  artistName?: SearchableStringFilterInput | null,
  albumID?: SearchableStringFilterInput | null,
  and?: Array< SearchableReviewFilterInput | null > | null,
  or?: Array< SearchableReviewFilterInput | null > | null,
  not?: SearchableReviewFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableReviewSortInput = {
  field?: SearchableReviewSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableReviewSortableFields {
  id = "id",
  date = "date",
  userID = "userID",
  reviewerName = "reviewerName",
  title = "title",
  body = "body",
  rating = "rating",
  albumName = "albumName",
  artistName = "artistName",
  albumID = "albumID",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableReviewConnection = {
  __typename: "SearchableReviewConnection",
  items:  Array<Review >,
  nextToken?: string | null,
  total?: number | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  userID?: ModelStringInput | null,
  pic?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  nickname?: ModelStringInput | null,
  preferredUsername?: ModelStringInput | null,
  joinDate?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type SearchableUserFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  userID?: SearchableStringFilterInput | null,
  pic?: SearchableStringFilterInput | null,
  bio?: SearchableStringFilterInput | null,
  nickname?: SearchableStringFilterInput | null,
  preferredUsername?: SearchableStringFilterInput | null,
  joinDate?: SearchableStringFilterInput | null,
  and?: Array< SearchableUserFilterInput | null > | null,
  or?: Array< SearchableUserFilterInput | null > | null,
  not?: SearchableUserFilterInput | null,
};

export type SearchableUserSortInput = {
  field?: SearchableUserSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableUserSortableFields {
  id = "id",
  name = "name",
  userID = "userID",
  pic = "pic",
  bio = "bio",
  nickname = "nickname",
  preferredUsername = "preferredUsername",
  joinDate = "joinDate",
}


export type SearchableUserConnection = {
  __typename: "SearchableUserConnection",
  items:  Array<User >,
  nextToken?: string | null,
  total?: number | null,
};

export type CreateReviewMutationVariables = {
  input: CreateReviewInput,
  condition?: ModelReviewConditionInput | null,
};

export type CreateReviewMutation = {
  createReview?:  {
    __typename: "Review",
    id: string,
    date: string,
    userID: string,
    reviewerName?: string | null,
    title?: string | null,
    body?: string | null,
    rating?: number | null,
    albumName?: string | null,
    artistName?: string | null,
    albumID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateReviewMutationVariables = {
  input: UpdateReviewInput,
  condition?: ModelReviewConditionInput | null,
};

export type UpdateReviewMutation = {
  updateReview?:  {
    __typename: "Review",
    id: string,
    date: string,
    userID: string,
    reviewerName?: string | null,
    title?: string | null,
    body?: string | null,
    rating?: number | null,
    albumName?: string | null,
    artistName?: string | null,
    albumID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteReviewMutationVariables = {
  input: DeleteReviewInput,
  condition?: ModelReviewConditionInput | null,
};

export type DeleteReviewMutation = {
  deleteReview?:  {
    __typename: "Review",
    id: string,
    date: string,
    userID: string,
    reviewerName?: string | null,
    title?: string | null,
    body?: string | null,
    rating?: number | null,
    albumName?: string | null,
    artistName?: string | null,
    albumID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    userID: string,
    pic?: string | null,
    bio?: string | null,
    nickname?: string | null,
    preferredUsername?: string | null,
    joinDate?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    userID: string,
    pic?: string | null,
    bio?: string | null,
    nickname?: string | null,
    preferredUsername?: string | null,
    joinDate?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    userID: string,
    pic?: string | null,
    bio?: string | null,
    nickname?: string | null,
    preferredUsername?: string | null,
    joinDate?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetReviewQueryVariables = {
  id: string,
};

export type GetReviewQuery = {
  getReview?:  {
    __typename: "Review",
    id: string,
    date: string,
    userID: string,
    reviewerName?: string | null,
    title?: string | null,
    body?: string | null,
    rating?: number | null,
    albumName?: string | null,
    artistName?: string | null,
    albumID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListReviewsQueryVariables = {
  filter?: ModelReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReviewsQuery = {
  listReviews?:  {
    __typename: "ModelReviewConnection",
    items:  Array< {
      __typename: "Review",
      id: string,
      date: string,
      userID: string,
      reviewerName?: string | null,
      title?: string | null,
      body?: string | null,
      rating?: number | null,
      albumName?: string | null,
      artistName?: string | null,
      albumID?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SearchReviewsQueryVariables = {
  filter?: SearchableReviewFilterInput | null,
  sort?: SearchableReviewSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
};

export type SearchReviewsQuery = {
  searchReviews?:  {
    __typename: "SearchableReviewConnection",
    items:  Array< {
      __typename: "Review",
      id: string,
      date: string,
      userID: string,
      reviewerName?: string | null,
      title?: string | null,
      body?: string | null,
      rating?: number | null,
      albumName?: string | null,
      artistName?: string | null,
      albumID?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } >,
    nextToken?: string | null,
    total?: number | null,
  } | null,
};

export type SyncReviewsQueryVariables = {
  filter?: ModelReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncReviewsQuery = {
  syncReviews?:  {
    __typename: "ModelReviewConnection",
    items:  Array< {
      __typename: "Review",
      id: string,
      date: string,
      userID: string,
      reviewerName?: string | null,
      title?: string | null,
      body?: string | null,
      rating?: number | null,
      albumName?: string | null,
      artistName?: string | null,
      albumID?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    userID: string,
    pic?: string | null,
    bio?: string | null,
    nickname?: string | null,
    preferredUsername?: string | null,
    joinDate?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      userID: string,
      pic?: string | null,
      bio?: string | null,
      nickname?: string | null,
      preferredUsername?: string | null,
      joinDate?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SearchUsersQueryVariables = {
  filter?: SearchableUserFilterInput | null,
  sort?: SearchableUserSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
};

export type SearchUsersQuery = {
  searchUsers?:  {
    __typename: "SearchableUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      userID: string,
      pic?: string | null,
      bio?: string | null,
      nickname?: string | null,
      preferredUsername?: string | null,
      joinDate?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } >,
    nextToken?: string | null,
    total?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      userID: string,
      pic?: string | null,
      bio?: string | null,
      nickname?: string | null,
      preferredUsername?: string | null,
      joinDate?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateReviewSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateReviewSubscription = {
  onCreateReview?:  {
    __typename: "Review",
    id: string,
    date: string,
    userID: string,
    reviewerName?: string | null,
    title?: string | null,
    body?: string | null,
    rating?: number | null,
    albumName?: string | null,
    artistName?: string | null,
    albumID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateReviewSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateReviewSubscription = {
  onUpdateReview?:  {
    __typename: "Review",
    id: string,
    date: string,
    userID: string,
    reviewerName?: string | null,
    title?: string | null,
    body?: string | null,
    rating?: number | null,
    albumName?: string | null,
    artistName?: string | null,
    albumID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteReviewSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteReviewSubscription = {
  onDeleteReview?:  {
    __typename: "Review",
    id: string,
    date: string,
    userID: string,
    reviewerName?: string | null,
    title?: string | null,
    body?: string | null,
    rating?: number | null,
    albumName?: string | null,
    artistName?: string | null,
    albumID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    userID: string,
    pic?: string | null,
    bio?: string | null,
    nickname?: string | null,
    preferredUsername?: string | null,
    joinDate?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    userID: string,
    pic?: string | null,
    bio?: string | null,
    nickname?: string | null,
    preferredUsername?: string | null,
    joinDate?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    userID: string,
    pic?: string | null,
    bio?: string | null,
    nickname?: string | null,
    preferredUsername?: string | null,
    joinDate?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
