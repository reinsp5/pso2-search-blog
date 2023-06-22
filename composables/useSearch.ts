import { MeiliResponse } from '~/types/meilisearch';

export const useSearch = () => {
  const config = useRuntimeConfig();
  const parms = ref<any>({});
  
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
        body: {
          ...parms.value,
        },
      }
    );

    return data.value;
  };

  return { search, parms };
};
