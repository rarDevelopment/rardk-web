export interface BlueskyPostFull {
  uri: string;
  cid: string;
  value: Value;
}

export interface Value {
  text: string;
  $type: string;
  facets: Facet[];
  createdAt: string;
}

export interface Facet {
  index: Index;
  features: Feature[];
}

export interface Index {
  byteEnd: number;
  byteStart: number;
}

export interface Feature {
  uri?: string;
  $type: string;
  tag?: string;
}
