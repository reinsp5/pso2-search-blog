import { IItem } from "./item";

export interface MeiliResponse {
  hits: MeiliIndex[];
  query: string;
}

export interface MeiliIndex extends IItem {
  _firestore_id: string;
}
