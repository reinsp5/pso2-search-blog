import { Item } from "@/types/item";
/**************************************************
 * グローバルステート
 **************************************************/

// 登録中のアイテム情報
export const useInsertItemInfo = () => {
  return useState<Item>("insert-item-info", () => {
    return new Item();
  });
};
