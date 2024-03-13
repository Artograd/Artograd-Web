import { LatLngLiteral } from 'leaflet';

export enum Status {
  GATHERING = 'gathering',
  VOTING = 'voting',
  INVESTING = 'investing',
  IMPLEMENTING = 'implementing',
  DONE = 'done',
}

export type Author = {
  id: number;
  authorPic: string;
  authorName: string;
  authorRole: string;
  authorLinkedIn: string;
  authorEmail: string;
};

export type Proposals = {
  id: number;
  status: string;
  published: string;
  thumbnail: string;
  likes: number;
  liked: boolean;
  selected: boolean;
  title: string;
  description: string;
  authors: Author[];
};

export type Tender = {
  id: number;
  tags: string[];
  location: string;
  author: string;
  attachments: string[];
  published: string;
  delivery: string;
  status: Status;
  title: string;
  description: string;
  proposals: Proposals[];
};

export type CategoryItemType = {
  name: string;
  id?: number;
};

export type CityItemType = LatLngLiteral & {
  name: string;
  id?: number;
};

export enum TenderStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  IDEATION = 'IDEATION',
  VOTING = 'VOTING',
  SELECTION = 'SELECTION',
  CANCELLED = 'CANCELLED',
  CLOSED = 'CLOSED',
  DELETED = 'DELETED',
}
