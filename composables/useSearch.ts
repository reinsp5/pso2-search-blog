import { MeiliResponse } from '~/types/meilisearch';
import { Item, mapItem } from './../types/item';


export const useSearch = () => {
  const config = useRuntimeConfig();
  const keyword = ref("");
  
  // 検索処理
  const search = async () => {
    const { data } = await useFetch<MeiliResponse>(
      "https://search.reinsp5.com/indexes/pso2-items/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.public.meilisearchApiKey}`,
        },
        body: JSON.stringify({
          q: keyword.value,
        }),
      }
    );

    // 検索結果がない場合は空配列を返す
    if (!data) return [] as Item[];

    const itemInfo = data.value!.hits.map((item: Item) => mapItem(item));
    console.log(itemInfo);
    return itemInfo;
  };

  return { search, keyword };
};
