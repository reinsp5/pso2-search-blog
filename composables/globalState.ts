import type { Item } from "@/types/item";
/**************************************************
 * グローバルステート
 **************************************************/

// 登録中のアイテム情報
export const useInsertItemInfo = () => {
  return useState<Item>("insert-item-info", () => {
    return {
      name: "",
      category: "",
      subCategory: "",
      rarity: 1,
      tradeable: false,
      pso2Revival: false,
      availableAt: [],
      tags: [],
      createUser: "",
      updateUser: "",
      createdAt: "",
      updatedAt: "",
    };
  });
};
