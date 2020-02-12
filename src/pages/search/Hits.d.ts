export interface Followers {
  totalCount: number;
}

export interface Community {
  canonicalUrl: string;
  followers: Followers;
  icon: string;
  id: string;
  image: string;
  name: string;
  preferredUsername: string;
  summary: string;
}

export interface Followers2 {
  totalCount: number;
}

export interface Name {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface Summary {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

export interface IndexType {
  value: string;
  matchLevel: string;
  matchedWords: string[];
  fullyHighlighted?: boolean;
}

export interface Url {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface HighlightResult {
  name: Name;
  summary: Summary;
  index_type: IndexType;
  url: Url;
}

export interface Likes {
  totalCount: number;
}

export interface Followers3 {
  totalCount: number;
}

export interface Community2 {
  canonicalUrl: string;
  followers: Followers3;
  icon: string;
  id: string;
  image: string;
  name: string;
  preferredUsername: string;
  summary: string;
}

export interface Followers4 {
  totalCount: number;
}

export interface Collection {
  canonicalUrl: string;
  community: Community2;
  createdAt: string;
  followers: Followers4;
  icon: string;
  id: string;
  name: string;
  preferredUsername: string;
  summary: string;
}

export interface Hit {
  canonicalUrl: string | null;
  community?: Community;
  createdAt: string;
  followers: Followers2;
  icon: string;
  name: string;
  preferredUsername: string;
  summary: string;
  index_type: string;
  index_instance: string;
  index_instance_object_id: string | null;
  objectID: string;
  _highlightResult: HighlightResult;
  license?: any;
  likes: Likes;
  updatedAt: string;
  url: string;
  collection?: Collection;
  image: string;
}
