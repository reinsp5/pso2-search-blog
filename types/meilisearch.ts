import { Item } from "./item";

export interface MeiliResponse {
  hits: Item[];
  query: string;
};